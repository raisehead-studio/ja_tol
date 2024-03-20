import * as d3 from "d3";
import * as fs from "node:fs";
import Papa from "papaparse";
import * as XLSX from "xlsx/xlsx.mjs";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNkMjIzMmE2LTQzZjktNDg2OS04MjYyLWUzY2U1MTc4N2NmOCIsImlhdCI6MTcxMDAzMTE2NywiZXhwIjoyMDI1MzkxMTY3fQ.vxYnvWpv-ND0Er3X7tR8cFr24ruz8c0GsiixyhbO9h4";

const date_transform = (date, parm) => {
  if (
    date[parm] === undefined ||
    date[parm] === "" ||
    date[parm] === "--" ||
    date[parm] === "暫無資料" ||
    date[parm] === "未完成" ||
    date[parm] === "NO"
  ) {
    return undefined;
  } else {
    let date_arr = date[parm].replace("日", "").split("月");
    if (date_arr[1] === "") {
      return new Date(`2023/${date_arr[0]}/01`);
    } else {
      return new Date(`2023/${date_arr[0]}/${date_arr[1]}`);
    }
  }
};

const create_customer = (
  customer_number,
  ele_number,
  name,
  short_name,
  ele_name,
  ele_address,
  registration_member_number,
  test
) => {
  const urlencoded = new URLSearchParams();
  const headers = new Headers();
  headers.append("Authorization", token);
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  urlencoded.append("customer_number", customer_number);
  urlencoded.append("ele_number", ele_number);
  urlencoded.append("name", name);
  urlencoded.append("short_name", short_name);

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: urlencoded,
    redirect: "follow",
  };

  fetch(
    "http://localhost:5500/api/v1/customers/create_customer",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      const urlencoded = new URLSearchParams();
      const headers = new Headers();
      headers.append("Authorization", token);
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      urlencoded.append("name", ele_name);
      urlencoded.append("address", ele_address);
      urlencoded.append("owner", "");
      urlencoded.append("cid", JSON.parse(result).data.cid);
      urlencoded.append(
        "registration_member_number",
        registration_member_number
      );
      urlencoded.append("ele_engineer", "");
      urlencoded.append("taiwan_power_company", "");
      urlencoded.append("government", "");
      urlencoded.append("test", test);

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(
        "http://localhost:5500/api/v1/customers/create_ele_place",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          return result;
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
};

const create_work_order = () => {};

async function patch_add_customer() {
  const data = await fs.readFileSync(
    "./data/data_company_20240307.json",
    "utf-8"
  );

  let company = JSON.parse(data);
  let execution = [];
  for (let i = 0; i < company.length; i++) {
    execution.push(
      create_customer(
        company[i]["客戶編號"],
        company[i]["電號"],
        "",
        company[i]["客戶簡稱"],
        company[i]["用電場所名稱"],
        company[i]["用電場所地址"],
        company[i]["執照編號"],
        company[i]["檢測期別"]
      )
    );
  }

  await Promise.all(execution);
}

function get_customer_id() {
  const header = new Headers();
  header.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNkMjIzMmE2LTQzZjktNDg2OS04MjYyLWUzY2U1MTc4N2NmOCIsImlhdCI6MTcxMDAzMTE2NywiZXhwIjoyMDI1MzkxMTY3fQ.vxYnvWpv-ND0Er3X7tR8cFr24ruz8c0GsiixyhbO9h4"
  );

  const requestOptions = {
    method: "GET",
    headers: header,
    redirect: "follow",
  };

  fetch(
    "http://localhost:5500/api/v1/customers?orderBy=customer_number&orderType=asc",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      const data = JSON.parse(result).data;
      let dic = [];

      for (let i = 0; i < data.length; i++) {
        dic.push({
          客戶簡稱: data[i]["short_name"],
          cid: data[i]["cid"],
        });
      }
      const csv = Papa.unparse(dic, {
        download: true,
      });

      fs.writeFileSync(`./data/customer_id.csv`, csv);
    })
    .catch((error) => console.error(error));
}

function patch_add_work_order(i) {
  // read data from json file
  const data = fs.readFileSync("./data/work_order.json", "utf-8");
  const work_order = JSON.parse(data);
  console.log("----------------------------");
  console.log(work_order[i]["工單編號"]);

  // make sure if company existing
  if (work_order[i].cid !== null) {
    // insert data into database - work_order
    const urlencoded = new URLSearchParams();
    const headers = new Headers();
    headers.append("Authorization", token);
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    urlencoded.append("cid", work_order[i].cid);
    urlencoded.append("order_number", work_order[i]["工單編號"]);
    urlencoded.append("name", work_order[i]["工程名稱"]);
    urlencoded.append("amount", 0);
    urlencoded.append("type", "其他");
    urlencoded.append("inquiry_member", "test");
    urlencoded.append("responsible_member", "test");
    urlencoded.append("po", "無");
    urlencoded.append("invoice_number", 0);
    urlencoded.append(
      "report_type",
      date_transform(work_order[i], "預計排程日")
    );
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: urlencoded,
      redirect: "follow",
    };
    fetch(
      "http://localhost:5500/api/v1/work_orders/create_work_order",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const woid = JSON.parse(result).data.woid;

        // update factory
        const urlencoded = new URLSearchParams();
        const headers = new Headers();
        headers.append("Authorization", token);
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        if (date_transform(work_order[i], "入廠資料完成")) {
          urlencoded.append(
            "tracking_date",
            date_transform(work_order[i], "入廠資料完成")
          );
        }
        urlencoded.append("woid", woid);
        urlencoded.append("tracking_is_finished", false);
        const requestOptions = {
          method: "PUT",
          headers: headers,
          body: urlencoded,
          redirect: "follow",
        };
        fetch(
          "http://localhost:5500/api/v1/work_orders/update_factory",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            //update assignmen
            const urlencoded = new URLSearchParams();
            const headers = new Headers();
            headers.append("Authorization", token);
            headers.append("Content-Type", "application/x-www-form-urlencoded");
            urlencoded.append("woid", woid);
            urlencoded.append("manufacturing_status", "不需備料");
            urlencoded.append(
              "is_assign_manpower",
              work_order[i]["人力安排"] ? true : false
            );
            urlencoded.append("external_contact_is_holiday", false);
            urlencoded.append("external_contact_is_power_stop", false);
            urlencoded.append("external_contact_request_date", new Date());
            urlencoded.append("tracking_is_finished", false);
            if (date_transform(work_order[i], "備料日期")) {
              urlencoded.append(
                "manufacturing_date",
                date_transform(work_order[i], "備料日期")
              );
            } else {
              urlencoded.append("manufacturing_date", new Date());
            }

            const requestOptions = {
              method: "PUT",
              headers: headers,
              body: urlencoded,
              redirect: "follow",
            };
            fetch(
              "http://localhost:5500/api/v1/work_orders/update_assignment",
              requestOptions
            )
              .then((response) => response.text())
              .then((result) => {
                console.log(result);
                //update acceptance_check
                const urlencoded = new URLSearchParams();
                const headers = new Headers();
                headers.append("Authorization", token);
                headers.append(
                  "Content-Type",
                  "application/x-www-form-urlencoded"
                );
                urlencoded.append("woid", woid);
                urlencoded.append("tracking_is_finished", false);
                urlencoded.append("is_photo_before", false);
                urlencoded.append("is_photo_during", false);
                urlencoded.append("is_photo_after", false);
                urlencoded.append("is_warranty", false);
                if (date_transform(work_order[i], "驗收資料完成日")) {
                  urlencoded.append(
                    "tracking_date",
                    date_transform(work_order[i], "驗收資料完成日")
                  );
                }
                if (date_transform(work_order[i], "施工照片")) {
                  urlencoded.append(
                    "photo_download_date",
                    date_transform(work_order[i], "施工照片")
                  );
                }
                const requestOptions = {
                  method: "PUT",
                  headers: headers,
                  body: urlencoded,
                  redirect: "follow",
                };
                fetch(
                  "http://localhost:5500/api/v1/work_orders/update_acceptance_check",
                  requestOptions
                )
                  .then((response) => response.text())
                  .then((result) => {
                    console.log(result);
                    //update tobill
                    const urlencoded = new URLSearchParams();
                    const headers = new Headers();
                    headers.append("Authorization", token);
                    headers.append(
                      "Content-Type",
                      "application/x-www-form-urlencoded"
                    );
                    urlencoded.append("woid", woid);
                    urlencoded.append("tracking_is_finished", false);
                    if (date_transform(work_order[i], "請款狀態")) {
                      urlencoded.append(
                        "tracking_date",
                        date_transform(work_order[i], "請款狀態")
                      );
                    }
                    const requestOptions = {
                      method: "PUT",
                      headers: headers,
                      body: urlencoded,
                      redirect: "follow",
                    };
                    fetch(
                      "http://localhost:5500/api/v1/work_orders/update_tobill",
                      requestOptions
                    )
                      .then((response) => response.text())
                      .then((result) => {
                        console.log(result);
                        create_data_inside_assignments(
                          woid,
                          date_transform(work_order[i], "預計排程日"),
                          date_transform(work_order[i], "實際排程日"),
                          date_transform(work_order[i], "外部聯絡單回復日"),
                          date_transform(work_order[i], "台電通知日")
                        );
                        console.log("----------------------------");
                      })
                      .catch((error) => console.error(error));
                  })
                  .catch((error) => console.error(error));
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.error(error));
        // fetch(
        //   `http://localhost:5500/api/v1/work_orders/get_assignment_detail/${woid}`
        // ).then((result) => {});
      })
      .catch((error) => console.error(error));
  }
}

function create_data_inside_assignments(
  woid,
  started_time,
  actual_date,
  receive_date,
  tai_power_notify_date
) {
  const headers = new Headers();
  const requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  headers.append("Authorization", token);
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  fetch(
    `http://localhost:5500/api/v1/work_orders/get_assignment_detail/${woid}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      const aid = JSON.parse(result).data.id;

      // create man power scheduler
      const headers = new Headers();
      const urlencoded = new URLSearchParams();
      headers.append("Authorization", token);
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      urlencoded.append("aid", aid);
      if (started_time) urlencoded.append("started_time", started_time);
      if (actual_date) urlencoded.append("actual_date", actual_date);
      urlencoded.append("note", "");

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(
        `http://localhost:5500/api/v1/work_orders/create_manpower_schedule`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          const headers = new Headers();
          const urlencoded = new URLSearchParams();
          headers.append("Authorization", token);
          headers.append("Content-Type", "application/x-www-form-urlencoded");
          urlencoded.append("aid", aid);
          if (receive_date) urlencoded.append("receive_date", receive_date);
          if (tai_power_notify_date)
            urlencoded.append("tai_power_notify_date", tai_power_notify_date);

          const requestOptions = {
            method: "POST",
            headers: headers,
            body: urlencoded,
            redirect: "follow",
          };

          fetch(
            `http://localhost:5500/api/v1/work_orders/create_power_stop`,
            requestOptions
          )
            .then((response) => response.text())
            .then((result) => {
              console.log(result);
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
}

// get_customer_id();
// patch_add_customer();
const data = fs.readFileSync("./data/work_order.json", "utf-8");
const work_order = JSON.parse(data);
let delay = 15000;
for (let i = 0; i < work_order.length; i++) {
  setTimeout(() => {
    patch_add_work_order(i);
  }, delay);

  delay += 15000; //
}
