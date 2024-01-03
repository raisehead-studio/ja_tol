import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TableSortLabel from "@mui/material/TableSortLabel";

import { getServices, deleteServices } from "../api/services";
import { ServiceResponseDataType } from "../types/services";
import { useLayoutContext } from "../components/LayoutContext";

import CreateService from "../components/CreateServiceModal";
import ViewServiceContent from "../components/ServiceContentModal";

const Services = () => {
  const [data, setData] = useState([]);
  const [openCreateServiceModal, setOpenCreateServiceModal] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedService, setSelectedService] = useState<string>("");
  const [sort, setSort] = useState<"desc" | "asc" | undefined>("asc");
  const [sortValue, setSortValue] = useState<string>("customer_number");
  const { user } = useLayoutContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetCustomers = async () => {
      try {
        setLoading(true);
        const services = await getServices();
        setData(services);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (!openCreateServiceModal) handleGetCustomers();
  }, [openCreateServiceModal]);

  // useEffect(() => {
  //   const handleGetCustomers = async () => {
  //     try {
  //       const customers = await getCustomers();
  //       setLoading(true);
  //       setData(customers);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       setLoading(false);
  //     }
  //   };

  //   handleGetCustomers();
  // }, []);

  useEffect(() => {
    if (
      sortValue === "update_date" ||
      sortValue === "notify_date" ||
      sortValue === "update_date"
    ) {
      if (sort === "desc") {
        setData(
          data.sort(
            (a: any, b: any) =>
              dayjs(a[sortValue]).unix() - dayjs(b[sortValue]).unix()
          )
        );
      } else {
        setData(
          data.sort(
            (a: any, b: any) =>
              dayjs(b[sortValue]).unix() - dayjs(a[sortValue]).unix()
          )
        );
      }
    } else {
      if (sort === "desc") {
        setData(
          data.sort((a: any, b: any) => {
            let a_val = a[sortValue];
            let b_val = b[sortValue];
            return a_val?.toString().localeCompare(b_val.toString());
          })
        );
      } else {
        setData(
          data.sort((a: any, b: any) => {
            let a_val = a[sortValue] || "";
            let b_val = b[sortValue] || "";
            return b_val?.toString().localeCompare(a_val.toString());
          })
        );
      }
    }
  }, [data, sort, sortValue]);

  const handleToggleSort = (value: string) => {
    setSortValue(value);
    setSort(sort === "asc" ? "desc" : "asc");
  };

  const handleCloseModal = () => {
    setSelectedService("");
    return;
  };

  const handleOpenModal = (csid: string) => {
    setSelectedService(csid);
  };

  const handleOpenCreateCustomerModal = () => {
    setOpenCreateServiceModal(true);
  };

  const handleCloseCreateCustomerModal = () => {
    setOpenCreateServiceModal(false);
    return;
  };

  const handleDeleteService = async (id: string) => {
    Swal.fire({
      title: "系統訊息",
      text: "您確定要刪除此筆資料?(資料刪除後將無法復原)",
      showCancelButton: true,
      cancelButtonText: "取消",
      confirmButtonText: "確定",
      confirmButtonColor: "#3f50b5",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const response = await deleteServices(id);
          if (response.code === 200) {
            const services = await getServices();
            setLoading(false);
            setData(services);
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        gap: "1rem",
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}>
        <Typography variant="h5">客服資料列表</Typography>
        <Box
          sx={{
            display: user?.permission.is_service_page_insert ? "block" : "none",
          }}>
          <Button onClick={handleOpenCreateCustomerModal}>
            <Typography variant="button">新增客服資料</Typography>
          </Button>
        </Box>
      </Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 68.5px - 120px)",
          }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "calc(100vh - 84.5px - 2rem - 32px - 37px)" }}>
          <Table
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="a dense table"
            stickyHeader>
            <TableHead
              sx={(s) => ({
                backgroundColor: s.palette.primary.main,
                tr: {
                  backgroundColor: "inherit !important",

                  th: {
                    backgroundColor: "inherit !important",
                    color: "white",
                  },
                },
              })}>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{
                    width: "5%",
                  }}></TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "5%",
                  }}></TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "5%",
                  }}></TableCell>
                <TableCell align="left">
                  {" "}
                  <TableSortLabel
                    direction={sort}
                    onClick={() => handleToggleSort("notify_date")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    追蹤日期
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <TableSortLabel
                    direction={sort}
                    onClick={() => handleToggleSort("customer_number")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    客戶編號
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <TableSortLabel
                    direction={sort}
                    onClick={() => handleToggleSort("short_name")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    客戶簡稱
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <TableSortLabel
                    direction={sort}
                    onClick={() => handleToggleSort("status")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    狀態
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <TableSortLabel
                    direction={sort}
                    onClick={() => handleToggleSort("type")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    類型
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <TableSortLabel
                    direction={sort}
                    onClick={() => handleToggleSort("title")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    主旨
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <TableSortLabel
                    direction={sort}
                    onClick={() => handleToggleSort("update_date")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    建立日期
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <TableSortLabel
                    direction={sort}
                    onClick={() => handleToggleSort("update_member")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    最新編輯者
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <TableSortLabel
                    direction={sort}
                    onClick={() => handleToggleSort("update_date")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    最新編輯日期
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((service: ServiceResponseDataType) => {
                let customer_status;
                switch (service.status) {
                  case "in_progress":
                    customer_status = "進行中";
                    break;
                  case "done":
                    customer_status = "已完成";
                    break;
                  case "closed":
                    customer_status = "已結案";
                    break;
                  default:
                    customer_status = "未知";
                    break;
                }

                return (
                  <TableRow
                    key={service.id}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}>
                    <TableCell align="left">
                      <Tooltip title="檢視">
                        <IconButton
                          onClick={() => handleOpenModal(service.id)}
                          size="small"
                          disabled={!user?.permission.is_service_page_read}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left">
                      <Tooltip title="編輯">
                        <IconButton
                          onClick={() => {
                            navigate(`/services/${service.id}`);
                          }}
                          size="small"
                          disabled={!user?.permission.is_service_page_update}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left">
                      <Tooltip title="刪除">
                        <IconButton
                          onClick={() => {
                            handleDeleteService(service.id);
                          }}
                          disabled={!user?.permission.is_service_page_delete}
                          size="small">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left">
                      {dayjs(service.notify_date).format("YYYY/MM/DD")}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {service.customer_number}
                    </TableCell>
                    <TableCell align="left">{service.short_name}</TableCell>
                    <TableCell align="left">{customer_status}</TableCell>
                    <TableCell align="left">{service.type}</TableCell>
                    <TableCell align="left">{service.title}</TableCell>
                    <TableCell align="left">
                      {dayjs(service.update_date).format("YYYY/MM/DD")}
                    </TableCell>
                    <TableCell align="left">{service.update_member}</TableCell>
                    <TableCell align="left">
                      {dayjs(service.update_date).format("YYYY/MM/DD")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <CreateService
        open={openCreateServiceModal}
        handleClose={handleCloseCreateCustomerModal}
      />
      <ViewServiceContent
        open={Boolean(selectedService)}
        handleClose={handleCloseModal}
        csid={selectedService}
      />
    </Box>
  );
};

export default Services;
