import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
  const [status, setStatus] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [notifyDate, setNotifyDate] = useState<string>("");
  const [updateMember] = useState<string>("test_admin");
  const [createMember] = useState<string>("test_admin");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [customersOptions, setCustomersOptions] = useState<any>([]);

  const handleCreateCustomer = async () => {
    const data: ServiceRequestDataType = {
      cid: cid,
      title: title,
      status: status,
      type: type,
      notify_date: notifyDate,
      update_member: updateMember,
      create_member: createMember,
      content: content,
    };

    try {
      setLoading(true);
      const response = await createServices(data);
      console.log(response);

      if (response.status === 200) {
        setLoading(false);
        handleClose();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const handleGetCustomers = async () => {
      try {
        setLoading(true);
        const customers = await getCustomers();
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
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
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
                label="客服紀錄標題"
                name="title"
                value={title}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <TextField
                label="下次提醒時間"
                name="notifyData"
                value={notifyDate}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setNotifyDate(e.target.value);
                }}
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
                value={type}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setType(e.target.value);
                }}
              />
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
                label="客服紀錄內容"
                name="content"
                value={content}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
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