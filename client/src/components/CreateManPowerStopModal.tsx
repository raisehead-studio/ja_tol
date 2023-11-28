import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";

import { createManPowerStop } from "../api/works";

const CreateManPowerStop = ({
  aid,
  open,
  handleClose,
}: {
  aid: string;
  open: boolean;
  handleClose: () => void;
}) => {
  const [startedTime, setStartedTime] = useState<Date | number>(
    new Date().getTime()
  );
  const [finishedTime, setFinishedTime] = useState<Date | number>(
    new Date().getTime()
  );
  const [area, setArea] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateManPowerStop = async () => {
    const data = {
      aid,
      area,
      started_date: startedTime,
      finished_date: finishedTime,
    };

    try {
      setLoading(true);
      await createManPowerStop(data);
      setLoading(false);
      handleClose();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
          <>
            <Typography variant="h5">建立停電狀況</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <TextField
                label="停電區域"
                name="name"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={area || ""}
                onChange={(e) => setArea(e.target.value)}
              />
              <DateTimePicker
                label="停電開始時間"
                value={dayjs(startedTime) || ""}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
                onChange={(newValue: any) => {
                  if (newValue) {
                    setStartedTime(new Date(newValue.$d).getTime());
                  }
                }}
              />
              <DateTimePicker
                label="停電結束時間"
                value={dayjs(finishedTime) || ""}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
                onChange={(newValue: any) => {
                  if (newValue) {
                    setFinishedTime(new Date(newValue.$d).getTime());
                  }
                }}
              />
            </Box>
            <Divider />
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
                disabled={!startedTime || !finishedTime || !area}
                variant="contained"
                onClick={handleCreateManPowerStop}>
                建立
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CreateManPowerStop;
