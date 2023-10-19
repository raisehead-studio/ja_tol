import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";

import { createWork } from "../api/works";
import { getCustomers } from "../api/customers";

import { WorkRequestDataType } from "../types/works";

const CreateWork = ({
  selectedCid,
  open,
  handleClose,
}: {
  selectedCid?: string;
  open: boolean;
  handleClose: () => void;
}) => {
  const [cid, setCid] = useState<string>("");
  // const [customerNumber, setCustomerNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  // const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [responsibleMember, setResponsibleMember] = useState<string>("");
  const [inquiryMember, setInquiryMember] = useState<string>("");
  const [po, setPo] = useState<string>("");
  const [acceptanceCheckDate, setAcceptanceCheckDate] = useState<string>("");
  const [toBillDate, setToiBillDate] = useState<string>("");
  const [assignmentDate, setAssignmentDate] = useState<string>("");
  const [factoryDate, setFactoryDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [customersOptions, setCustomersOptions] = useState<any>([]);

  const handleCreateCustomer = async () => {
    const data: WorkRequestDataType = {
      cid: cid,
      name: name,
      // invoice_number: invoiceNumber,
      order_number: orderNumber,
      type: type,
      amount: amount,
      inquiry_member: inquiryMember,
      responsible_member: responsibleMember,
      po: po,
      acceptance_check_date: acceptanceCheckDate,
      tobill_date: toBillDate,
      factory_date: factoryDate,
      assignment_date: assignmentDate,
    };

    try {
      const response = await createWork(data);
      if (response.status === 200) {
        handleClose();
      }
    } catch (error) {
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
                label="工單編號"
                value={orderNumber}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setOrderNumber(e.target.value);
                }}
              />
              <TextField
                label="工程名稱"
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
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <TextField
                label="工程類型"
                value={type}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setType(e.target.value);
                }}
              />
              <TextField
                label="採購PO"
                name="po"
                value={po}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setPo(e.target.value);
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
                label="派工作業完成日"
                name="assignmentDate"
                value={assignmentDate}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setAssignmentDate(e.target.value);
                }}
              />
              <TextField
                label="入廠作業完成日"
                name="factoryDate"
                value={factoryDate}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setFactoryDate(e.target.value);
                }}
              />
              <TextField
                label="請款作業完成日"
                name="toBillDate"
                value={toBillDate}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setToiBillDate(e.target.value);
                }}
              />
              <TextField
                label="驗收作業完成日"
                name="acceptanceCheckDate"
                value={acceptanceCheckDate}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setAcceptanceCheckDate(e.target.value);
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
                label="金額(含稅)"
                value={amount}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <TextField
                label="報價者"
                name="inquiryMember"
                value={inquiryMember}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setInquiryMember(e.target.value);
                }}
              />
              <TextField
                label="責任者"
                name="responsibleMember"
                value={responsibleMember}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={(e) => {
                  setResponsibleMember(e.target.value);
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
            disabled={!cid || !name || !type || !amount || !responsibleMember}
            variant="contained"
            onClick={handleCreateCustomer}>
            建立
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateWork;
