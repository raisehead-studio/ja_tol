import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

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
            onClick={() => {}}>
            建立
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateServiceContent;
