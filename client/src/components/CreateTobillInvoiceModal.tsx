import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import { enqueueSnackbar } from "notistack";

import { createInvoicebill } from "../api/works";

const CreateTobillInvoice = ({
  tbid,
  open,
  handleClose,
}: {
  tbid: string;
  open: boolean;
  handleClose: () => void;
}) => {
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [date, setDate] = useState<Date | number>(new Date().getTime());
  const [amount, setAmount] = useState<number>(0);
  const [percentage, setPercentage] = useState<string>("0%");
  const [note, setNote] = useState<string>("");
  const [sentDate, setSentDate] = useState<Date | number>(new Date());
  const [numbersInvoices, setNumbersInvoices] = useState<number>(0);
  const [numbersEnvelope, setNumbersEnvelope] = useState<number>(0);
  const [numbersReports, setNumbersReports] = useState<number>(0);
  const [numbersGeneralForms, setNumbersGeneralForms] = useState<number>(0);
  const [numbersInqualifyAgreements, setNumbersInqualifyAgreements] =
    useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateManPowerStop = async () => {
    const data = {
      tbid,
      invoice_number: invoiceNumber,
      date,
      amount,
      percentage,
      note,
      sent_date: sentDate,
      numbers_invoices: numbersInvoices,
      numbers_envelope: numbersEnvelope,
      numbers_reports: numbersReports,
      numbers_general_forms: numbersGeneralForms,
      numbers_inqualify_agreements: numbersInqualifyAgreements,
    };
    try {
      setLoading(true);
      const res = await createInvoicebill(data);
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
      setInvoiceNumber("");
      setDate(new Date().getTime());
      setAmount(0);
      setPercentage("0%");
      setNote("");
      setSentDate(new Date());
      setNumbersInvoices(0);
      setNumbersEnvelope(0);
      setNumbersReports(0);
      setNumbersGeneralForms(0);
      setNumbersInqualifyAgreements(0);
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
            <Typography variant="h5">建立發票記錄</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <TextField
                label="合約總額%數"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                name="percentage"
              />
              <DatePicker
                format="YYYY/MM/DD"
                label="發票日期"
                value={dayjs(date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
                onChange={(newValue: any) => {
                  if (newValue) {
                    setDate(new Date(newValue.$d).getTime());
                  }
                }}
              />
              <TextField
                label="金額(未稅)"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={amount}
                name="amount"
                onChange={(e) => setAmount(+e.target.value)}
              />
              <TextField
                label="發票號碼"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={invoiceNumber}
                name="invoice_number"
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
              <TextField
                label="郵寄備註"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={note}
                name="note"
                onChange={(e) => setNote(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <DatePicker
                format="YYYY/MM/DD"
                label="郵寄日期"
                value={dayjs(sentDate)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
                onChange={(newValue: any) => {
                  if (newValue) {
                    setSentDate(new Date(newValue.$d).getTime());
                  }
                }}
              />
              <TextField
                label="發票"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={numbersInvoices}
                name="numbers_invoices"
                onChange={(e) => setNumbersInvoices(+e.target.value)}
              />
              <TextField
                label="回郵信封"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={numbersEnvelope}
                name="numbers_envelope"
                onChange={(e) => setNumbersEnvelope(+e.target.value)}
              />
              <TextField
                label="報告書"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={numbersReports}
                name="numbers_reports"
                onChange={(e) => setNumbersReports(+e.target.value)}
              />
              <TextField
                label="檢驗總表"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={numbersGeneralForms}
                name="numbers_general_forms"
                onChange={(e) => setNumbersGeneralForms(+e.target.value)}
              />
              <TextField
                label="檢驗不良同意書"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={numbersInqualifyAgreements}
                name="numbers_inqualify_agreements"
                onChange={(e) => setNumbersInqualifyAgreements(+e.target.value)}
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
                  !percentage ||
                  !date ||
                  !amount ||
                  !invoiceNumber ||
                  !note ||
                  !sentDate ||
                  !numbersInvoices ||
                  !numbersEnvelope ||
                  !numbersReports ||
                  !numbersGeneralForms ||
                  !numbersInqualifyAgreements
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

export default CreateTobillInvoice;
