import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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
      await createInvoicebill(data);
      handleClose();
    } catch (error) {
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
          <Button variant="contained" color="secondary" onClick={handleClose}>
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
      </Box>
    </Modal>
  );
};

export default CreateTobillInvoice;
