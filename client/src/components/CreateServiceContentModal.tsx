import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { enqueueSnackbar } from "notistack";

import { createServiceContent } from "../api/services";

const CreateServiceContent = ({
  csid,
  open,
  handleClose,
}: {
  csid: string | undefined;
  open: boolean;
  handleClose: () => void;
}) => {
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateServiceContent = async () => {
    if (!csid || !data) return;
    let payload = {
      content: data,
      csid,
    };
    try {
      setLoading(true);
      const res = await createServiceContent(payload);
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
    }
  };

  useEffect(() => {
    if (!open) {
      setData("");
    }
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
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
            padding: "50px",
            gap: "1rem",
            backgroundColor: "#fff",
            width: "80vw",
            maxHeight: "80vh",
            overflowY: "scroll",
            borderRadius: "1rem",
            transform: "translate(calc(10vw - 50px), 5vh)",
          }}>
          <Typography variant="h5">建立客服紀內容</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}>
            <TextField
              label={`客服紀錄內容`}
              name="content"
              value={data}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              type="textarea"
              multiline={true}
              onChange={(e) => setData(e.target.value)}
              rows={4}
            />
          </Box>
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
              disabled={!csid || !data}
              variant="contained"
              onClick={handleCreateServiceContent}>
              建立
            </Button>
          </Box>
        </Box>
      )}
    </Modal>
  );
};

export default CreateServiceContent;
