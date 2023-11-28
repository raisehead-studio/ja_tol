import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";

import { createManPowerSchedule } from "../api/works";

const CreateManPowerSchedule = ({
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
  const [actualDate, setActualDate] = useState<Date | number>(
    new Date().getTime()
  );
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateManPowerSchedule = async () => {
    const data = {
      aid,
      note,
      started_time: startedTime,
      finished_time: finishedTime,
      actual_date: actualDate,
    };
    setLoading(true);
    try {
      await createManPowerSchedule(data);
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
            <Typography variant="h5">建立施工時間及人力安排</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <DateTimePicker
                label="預計排程開始時間"
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
                label="預計排程結束時間"
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
              <DatePicker
                format="YYYY/MM/DD"
                label="實際施工日期"
                value={dayjs(actualDate) || ""}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
                onChange={(newValue: any) => {
                  if (newValue) {
                    setActualDate(new Date(newValue.$d).getTime());
                  }
                }}
              />
              <TextField
                label="備註"
                name="name"
                size="small"
                value={note}
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => setNote(e.target.value)}
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
                disabled={!startedTime || !finishedTime || !actualDate || !note}
                variant="contained"
                onClick={handleCreateManPowerSchedule}>
                建立
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CreateManPowerSchedule;
