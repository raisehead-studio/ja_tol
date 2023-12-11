import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UpdateIcon from "@mui/icons-material/Update";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";

import { getCustomer, updateCustomer } from "../api/customers";

import {
  CustomerContactDataType,
  CustomerServiceDataType,
  CustomerResponseType,
  UpdateCustomerRequestDataType,
} from "../types/customers";
import { Menu, TextField } from "@mui/material";

import CreateService from "../components/CreateServiceModal";
import CreateCustomerContact from "../components/CreateCustomerContactModal";

const EditCustomers = () => {
  let { cid } = useParams();
  const [data, setData] = useState<CustomerResponseType | null>(null);
  const [openCreateService, setOpenCreateService] = useState<boolean>(false);
  const [openCreateCustomerContact, setOpenCreateCustomerContact] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenCreateCustomerContact = () =>
    setOpenCreateCustomerContact(true);

  const handleCloseCreateCustomerContact = () =>
    setOpenCreateCustomerContact(false);

  const handleOpenCreateService = () => {
    setOpenCreateService(true);
  };

  const handleCloseCreateService = () => {
    setOpenCreateService(false);
  };

  const handleUpdate = async () => {
    if (!data) return;
    setLoading(true);
    let updateData: UpdateCustomerRequestDataType = {
      cid: data.cid,
      factory_description: data.factory_description,
      acceptance_check_description: data.acceptance_check_description,
      tobill_description: data.tobill_description,
      invoice_description: data.invoice_description,
      ele_place_name: data.ele_place_name,
      ele_place_address: data.ele_place_address,
      ele_place_owner: data.ele_place_owner,
      customer_contacts: JSON.stringify(data.customer_contacts),
      customer_services: JSON.stringify(data.customer_services),
      registration_member_number: data.registration_member_number,
      ele_engineer: data.ele_engineer,
      taiwan_power_company: data.taiwan_power_company,
      government: data.government,
      test: data.test,
      other_description: data.other_description,
    };
    try {
      const res = await updateCustomer(updateData);
      enqueueSnackbar(res.message, {
        variant: res.status,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      setLoading(false);
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      setLoading(false);
    }
  };

  const handleUpdateFiled = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!data) return;
    let updateDate = {
      ...data,
      [name]: value,
    };
    setData(updateDate);
  };

  const handleUpdateRowDate = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string | undefined,
    data_name: string
  ) => {
    if (!data || !id) return;
    const { name, value } = e.target;
    let selected_row: CustomerContactDataType[] | CustomerServiceDataType[];
    if (data_name === "customer_contacts") {
      selected_row = data.customer_contacts;
      let updateDate = {
        ...data,
        customer_contacts: selected_row.map((item: CustomerContactDataType) => {
          if (item.id === id) {
            return {
              ...item,
              [name]: value,
            };
          } else {
            return item;
          }
        }),
      };
      setData(updateDate);
    } else if (data_name === "customer_services") {
      selected_row = data.customer_services;
      let updateDate = {
        ...data,
        customer_services: selected_row.map((item: CustomerServiceDataType) => {
          if (item.id === id) {
            return {
              ...item,
              [name]: value,
            };
          } else {
            return item;
          }
        }),
      };
      setData(updateDate);
    }
  };

  useEffect(() => {
    const handleGetCustomers = async (id: string) => {
      setLoading(true);
      try {
        const customers = await getCustomer(id);
        setData(customers);
        setLoading(false);
      } catch (error: any) {
        enqueueSnackbar(error.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        setLoading(false);
      }
    };
    if (cid && !openCreateService && !openCreateCustomerContact) {
      handleGetCustomers(cid);
    }
  }, [cid, openCreateService, openCreateCustomerContact]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        gap: "1rem",
      }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h5">編輯顧客基本資料</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <TextField
                label="客戶編號"
                name="customer_number"
                value={data?.customer_number || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleUpdateFiled}
                disabled
              />
              <TextField
                label="客戶名稱(經濟部公司登記)"
                name="name"
                value={data?.name || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleUpdateFiled}
                disabled
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <TextField
                label="客戶簡稱"
                name="name"
                value={data?.short_name || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleUpdateFiled}
                disabled
              />
              <TextField
                label="統一編號"
                name="tax_id"
                value={data?.tax_id || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleUpdateFiled}
                disabled
              />
            </Box>
          </Box>
          <Divider />
          <Typography variant="h5">用電場所</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
              }}>
              <TextField
                label="用電場所全名"
                name="ele_place_name"
                value={data?.ele_place_name || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleUpdateFiled}
              />
              <TextField
                label="用電場所負責人"
                name="ele_place_owner"
                value={data?.ele_place_owner || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleUpdateFiled}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
              }}>
              <TextField
                label="電器技術人員登記執照編號"
                name="registration_member_number"
                value={data?.registration_member_number || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleUpdateFiled}
              />
              <TextField
                label="專任電器技術人員"
                name="ele_engineer"
                value={data?.ele_engineer || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleUpdateFiled}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
              }}>
              <TextField
                label="台電單位"
                name="taiwan_power_company"
                value={data?.taiwan_power_company || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleUpdateFiled}
              />
              <TextField
                label="政府單位"
                name="government"
                value={data?.government || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleUpdateFiled}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
              }}>
              <TextField
                label="用電場所地址"
                name="ele_place_address"
                value={data?.ele_place_address || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleUpdateFiled}
              />
              <TextField
                label="檢測"
                name="test"
                value={data?.test || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleUpdateFiled}
                select
                sx={{
                  width: "30%",
                }}>
                <MenuItem value={"1月"}>1月</MenuItem>
                <MenuItem value={"2月"}>2月</MenuItem>
                <MenuItem value={"3月"}>3月</MenuItem>
                <MenuItem value={"4月"}>4月</MenuItem>
                <MenuItem value={"5月"}>5月</MenuItem>
                <MenuItem value={"6月"}>6月</MenuItem>
                <MenuItem value={"7月"}>7月</MenuItem>
                <MenuItem value={"8月"}>8月</MenuItem>
                <MenuItem value={"9月"}>9月</MenuItem>
                <MenuItem value={"10月"}>10月</MenuItem>
                <MenuItem value={"11月"}>11月</MenuItem>
                <MenuItem value={"12月"}>12月</MenuItem>
              </TextField>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
              }}>
              <TextField
                label="電號"
                name="ele_number"
                value={data?.ele_number || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleUpdateFiled}
                sx={{
                  width: "50%",
                }}
              />
            </Box>
          </Box>

          <Divider />
          <Typography variant="h5">備註</Typography>
          <TextField
            label={`入廠說明`}
            name="factory_description"
            value={data?.factory_description || ""}
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
            onChange={handleUpdateFiled}
          />
          <TextField
            label={`驗收說明`}
            name="acceptance_check_description"
            value={data?.acceptance_check_description || ""}
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
            onChange={handleUpdateFiled}
          />
          <TextField
            label={`請款說明`}
            name="tobill_description"
            value={data?.tobill_description || ""}
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
            onChange={handleUpdateFiled}
          />
          <TextField
            label={`報價說明`}
            name="invoice_description"
            value={data?.invoice_description || ""}
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
            onChange={handleUpdateFiled}
          />
          <TextField
            label={`其他說明`}
            name="other_description"
            value={data?.other_description || ""}
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
            onChange={handleUpdateFiled}
          />
          <Divider />
          {data?.customer_services.map((service, index) => (
            <Box key={service.id}>
              <Box>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}>
                  客服紀錄-{index + 1}：
                </Typography>
              </Box>
              <Button
                sx={{
                  px: "0px",
                }}
                onClick={() => {
                  navigate(`/services/${service.id}`);
                }}>
                {service.title} || 提醒日期：
                {dayjs(service.notify_date).format("YYYY/MM/DD")}
              </Button>
            </Box>
          ))}
          <Box>
            <Button startIcon={<AddIcon />} onClick={handleOpenCreateService}>
              新增客服紀錄
            </Button>
          </Box>
          <Divider />
          <Typography variant="h5">客戶聯絡人</Typography>
          {data?.customer_contacts.map((contact, index) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}>
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                }}>
                <TextField
                  label="聯絡窗口類型"
                  name="type"
                  value={contact.type}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={(e) =>
                    handleUpdateRowDate(e, contact.id, "customer_contacts")
                  }
                />
                <TextField
                  label={`聯絡人-${index + 1}`}
                  name="name"
                  value={contact.name}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={(e) =>
                    handleUpdateRowDate(e, contact.id, "customer_contacts")
                  }
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                }}>
                <TextField
                  label="職務內容"
                  name="job_description"
                  value={contact.job_description}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={(e) =>
                    handleUpdateRowDate(e, contact.id, "customer_contacts")
                  }
                />
                <TextField
                  label={`聯絡電話`}
                  name="phone"
                  value={contact.phone}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={(e) =>
                    handleUpdateRowDate(e, contact.id, "customer_contacts")
                  }
                />
              </Box>
              <Box>
                <TextField
                  label={`聯絡人備註`}
                  name="note"
                  value={contact.note}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={(e) =>
                    handleUpdateRowDate(e, contact.id, "customer_contacts")
                  }
                />
              </Box>
              <Divider />
            </Box>
          ))}
          <Box>
            <Button
              startIcon={<AddIcon />}
              onClick={handleOpenCreateCustomerContact}>
              新增聯絡人
            </Button>
          </Box>
          <Divider />
          <Box
            sx={{
              position: "sticky",
              bottom: "1rem",
              right: "1rem",
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}>
            <Button
              startIcon={<ArrowBackIosIcon />}
              variant="contained"
              onClick={() => navigate(-1)}>
              回到上一頁
            </Button>
            <Button
              startIcon={<UpdateIcon />}
              variant="contained"
              onClick={handleUpdate}>
              儲存
            </Button>
          </Box>
        </>
      )}

      <CreateService
        selectedCid={cid}
        open={openCreateService}
        handleClose={handleCloseCreateService}
      />
      <CreateCustomerContact
        cid={cid}
        open={openCreateCustomerContact}
        handleClose={handleCloseCreateCustomerContact}
      />
    </Box>
  );
};

export default EditCustomers;
