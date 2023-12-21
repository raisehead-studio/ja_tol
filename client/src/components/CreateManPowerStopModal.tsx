import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { enqueueSnackbar } from "notistack";

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
  const [area, setArea] = useState<"全廠" | "部分" | "無" | "其他">("其他");
  const [stopShift, setStopShift] = useState<"上午" | "下午" | "全天" | "其他">(
    "其他"
  );
  const [isHoliday, setIsHoliday] = useState<"假日" | "平日">("平日");
  const [otherDescription, setOtherDescription] = useState<string>("");
  const [customer, setCustomer] = useState<string>("");
  const [engineer, setEngineer] = useState<string>("");
  const [requestDate, setRequestDate] = useState<number>(new Date().getTime());
  const [receiveDate, setReceiveDate] = useState<number>(new Date().getTime());
  const [taiPowerArea, setTaiPowerArea] = useState<string>("");
  const [taiPowerNotifyDate, setTaiPowerNotifyDate] = useState<number>(
    new Date().getTime()
  );

  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateManPowerStop = async () => {
    const data = {
      aid,
      area,
      stop_shift: stopShift,
      is_holiday: isHoliday,
      other_description: otherDescription,
      customer,
      engineer,
      request_date: requestDate,
      receive_date: receiveDate,
      tai_power_area: taiPowerArea,
      tai_power_notify_date: taiPowerNotifyDate,
    };

    try {
      setLoading(true);
      const res = await createManPowerStop(data);
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
      setArea("其他");
      setStopShift("其他");
      setIsHoliday("平日");
      setOtherDescription("");
      setCustomer("");
      setEngineer("");
      setRequestDate(new Date().getTime());
      setReceiveDate(new Date().getTime());
      setTaiPowerArea("");
      setTaiPowerNotifyDate(new Date().getTime());
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
          <>
            <Typography variant="h5">建立停電狀況</Typography>
            <Typography variant="h6">停電狀況</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <TextField
                label="停電區域"
                name="area"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={area}
                onChange={(e) =>
                  setArea(e.target.value as "全廠" | "部分" | "無" | "其他")
                }
                select>
                <MenuItem value="全廠">全廠</MenuItem>
                <MenuItem value="部分">部分</MenuItem>
                <MenuItem value="無">無</MenuItem>
                <MenuItem value="其他">其他</MenuItem>
              </TextField>
              <TextField
                label="停電時間"
                name="stop_shift"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={stopShift}
                onChange={(e) =>
                  setStopShift(
                    e.target.value as "上午" | "下午" | "全天" | "其他"
                  )
                }
                select>
                <MenuItem value="全廠">上午</MenuItem>
                <MenuItem value="部分">下午</MenuItem>
                <MenuItem value="無">全天</MenuItem>
                <MenuItem value="其他">其他</MenuItem>
              </TextField>
              <TextField
                label="假日/平日"
                name="is_holiday"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={isHoliday}
                onChange={(e) => {
                  const { value } = e.target;
                  setIsHoliday(value as "假日" | "平日");
                }}
                select>
                <MenuItem value="假日">假日</MenuItem>
                <MenuItem value="平日">平日</MenuItem>
              </TextField>
              <TextField
                label="其他說明"
                name="other_description"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={otherDescription}
                onChange={(e) => setOtherDescription(e.target.value)}
              />
            </Box>
            <Typography variant="h6">外部聯絡單</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <TextField
                label="客戶聯絡人"
                name="customer"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
              />
              <TextField
                label="工程師聯絡人"
                name="engineer"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={engineer}
                onChange={(e) => setEngineer(e.target.value)}
              />
              <DatePicker
                format="YYYY/MM/DD"
                label="發函日期"
                value={dayjs(requestDate) || ""}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
                onChange={(newValue: any) => {
                  if (newValue) {
                    setRequestDate(new Date(newValue.$d).getTime());
                  }
                }}
              />
              <DatePicker
                format="YYYY/MM/DD"
                label="回函日期"
                value={dayjs(receiveDate) || ""}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
                onChange={(newValue: any) => {
                  if (newValue) {
                    setReceiveDate(new Date(newValue.$d).getTime());
                  }
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
                label="台電區域"
                name="tai_power_area"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={taiPowerArea}
                onChange={(e) => setTaiPowerArea(e.target.value)}
                sx={{
                  width: "25%",
                }}
                select>
                <MenuItem value="桃園台電西區 03-1234567">
                  桃園台電西區 03-1234567
                </MenuItem>
                <MenuItem value="桃園台電北區 03-0123456">
                  桃園台電北區 03-0123456
                </MenuItem>
              </TextField>
              <DatePicker
                format="YYYY/MM/DD"
                label="通知台電日期"
                value={dayjs(taiPowerNotifyDate) || ""}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
                onChange={(newValue: any) => {
                  if (newValue) {
                    setTaiPowerNotifyDate(new Date(newValue.$d).getTime());
                  }
                }}
                sx={{
                  width: "25%",
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
                disabled={
                  !area ||
                  !stopShift ||
                  !isHoliday ||
                  !customer ||
                  !engineer ||
                  !taiPowerArea ||
                  !requestDate ||
                  !receiveDate ||
                  !taiPowerNotifyDate
                }
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
