import { useState, Fragment, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { enqueueSnackbar } from "notistack";

import { createCustomerContact } from "../api/customers";

import { CustomerContactRequestDataType } from "../types/customers";
import { TextField } from "@mui/material";

const CreateCustomerContact = ({
  cid,
  open,
  handleClose,
}: {
  cid: string | undefined;
  open: boolean;
  handleClose: () => void;
}) => {
  const [type, setType] = useState<string>(
    "系統內定：例 聯絡部門 採購、廠務、勞安...等"
  );
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>(
    "系統內定：例 溝通排程、施工注意事項、入廠資料、驗收、請款...等"
  );
  const [note, setNote] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateCustomerContact = async () => {
    if (!cid) return;
    const data: CustomerContactRequestDataType = {
      cid,
      type,
      name,
      title,
      phone,
      job_description: jobDescription,
      note,
      email,
    };
    try {
      setLoading(true);
      const res = await createCustomerContact(data);
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

  useEffect(() => {
    if (!open) {
      setType("系統內定：例 聯絡部門 採購、廠務、勞安...等");
      setName("");
      setTitle("");
      setPhone("");
      setJobDescription(
        "系統內定：例 溝通排程、施工注意事項、入廠資料、驗收、請款...等"
      );
      setNote("");
      setEmail("");
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
          <Fragment>
            <Typography variant="h5">建立客戶聯絡人</Typography>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
              }}>
              <TextField
                label="聯絡部門"
                name="type"
                value={type}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setType(e.target.value);
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
              }}>
              <TextField
                label={`聯絡人/職稱/分機#`}
                name="name"
                value={name}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
              }}>
              <TextField
                label="職務內容"
                name="jobDescription"
                value={jobDescription}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setJobDescription(e.target.value);
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
              }}>
              <TextField
                label={`聯絡電話`}
                name="phone"
                value={phone}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
              }}>
              {/* <TextField
                label="聯絡人職稱"
                name="title"
                value={title}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              /> */}
              <TextField
                label={`聯絡電子信箱`}
                name="email"
                value={email}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Box>
            <Box>
              <TextField
                label={`聯絡人備註`}
                name="note"
                value={note}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
              }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}>
                取消
              </Button>
              <Button
                onClick={handleCreateCustomerContact}
                disabled={!name || !phone || !email}
                variant="contained">
                儲存
              </Button>
            </Box>
          </Fragment>
        )}
      </Box>
    </Modal>
  );
};

export default CreateCustomerContact;
