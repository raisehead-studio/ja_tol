import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
// import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";

import { createServices } from "../api/services";
import { getCustomers } from "../api/customers";

import { ServiceRequestDataType } from "../types/services";

const CreateService = ({
  selectedCid,
  open,
  handleClose,
}: {
  selectedCid?: string;
  open: boolean;
  handleClose: () => void;
}) => {
  const [cid, setCid] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [status, setStatus] = useState<string>("not_started");
  const [type, setType] = useState<string>("");
  const [notifyDate, setNotifyDate] = useState<number | "">("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [customersOptions, setCustomersOptions] = useState<any>([]);
  // const [customerName, setCustomerName] = useState<string>("");

  const handleCreateCustomer = async () => {
    const data: ServiceRequestDataType = {
      cid: cid,
      title: title,
      status: status,
      type: type,
      notify_date: notifyDate,
      content: content,
    };

    try {
      setLoading(true);
      const res = await createServices(data);
      enqueueSnackbar(res.message, {
        variant: res.status,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      setLoading(false);
      handleClose();
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

  const handleUpdateDate = (value: any) => {
    let updateDate = new Date(value.$d).getTime();
    setNotifyDate(updateDate);
  };

  useEffect(() => {
    const handleGetCustomers = async () => {
      try {
        setLoading(true);
        const customers = await getCustomers("customer_number", "asc");
        setCustomersOptions(customers);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    handleGetCustomers();
  }, []);

  useEffect(() => {
    if (selectedCid) {
      setCid(selectedCid);
    }
  }, [selectedCid]);

  // useEffect(() => {
  //   if (customerName) {
  //     const customer = customersOptions.find(
  //       (option: any) => option.short_name === customerName
  //     );

  //     if (customer) {
  //       setCid(customer.cid);
  //     }
  //   }
  // }, [customerName, customersOptions, cid]);

  useEffect(() => {
    if (!open) {
      setCid("");
      setTitle("");
      setStatus("");
      setType("");
      setNotifyDate("");
      setContent("");
    }
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "50px",
          gap: "1rem",
          backgroundColor: "#fff",
          width: "80vw",
          maxHeight: "80vh",
          overflowY: "scroll",
          borderRadius: "1rem",
          transform: "translate(calc(10vw - 50px), 5vh)",
        }}>
        <Typography variant="h5">建立客服紀錄</Typography>
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
                label="客戶名稱"
                name="cid"
                value={cid}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setCid(e.target.value);
                }}
                select>
                {customersOptions.map((option: any) => (
                  <MenuItem key={option.cid} value={option.cid}>
                    {option.short_name}
                  </MenuItem>
                ))}
              </TextField>
              {/* <Autocomplete
                disablePortal
                value={customerName}
                options={customersOptions.map((option: any) => {
                  return { label: option.short_name, cid: option.cid };
                })}
                fullWidth
                onChange={(
                  event: any,
                  newValue: { label: string; cid: string }
                ) => {
                  if (newValue) {
                    setCustomerName(newValue.label);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="客戶名稱"
                    value={cid}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                )}
              /> */}
              <TextField
                label="客戶編號"
                value={
                  cid
                    ? customersOptions.filter(
                        (option: any) => option.cid === cid
                      )[0].customer_number
                    : ""
                }
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
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
                label="客服紀錄主旨"
                name="title"
                value={title}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <DatePicker
                format="YYYY/MM/DD"
                label="下次提醒時間"
                value={dayjs(notifyDate) || ""}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
                onChange={(newValue) => handleUpdateDate(newValue)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <TextField
                label="客服紀錄類型"
                name="type"
                value={type || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setType(e.target.value);
                }}
                select>
                <MenuItem value="報價需求">報價需求</MenuItem>
                <MenuItem value="合約內檢測報價">合約內檢測報價</MenuItem>
                <MenuItem value="議價">議價</MenuItem>
                <MenuItem value="其他">其他</MenuItem>
              </TextField>
              <TextField
                label="客服紀錄狀態"
                name="status"
                value={status}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                select>
                <MenuItem value="not_started">未處理</MenuItem>
                <MenuItem value="in_progress">追蹤處理中</MenuItem>
                <MenuItem value="complete">結案（鎖單）</MenuItem>
              </TextField>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <TextField
                label="客服紀錄狀態"
                name="content"
                value={content}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="textarea"
                multiline={true}
                rows={4}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </Box>
          </Box>
        )}
        <Divider />
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
          }}>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            取消
          </Button>
          <Button
            disabled={!cid || !title || !notifyDate || !content}
            variant="contained"
            onClick={handleCreateCustomer}>
            建立
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateService;
