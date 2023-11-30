import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { createWork } from "../api/works";
import { getCustomers } from "../api/customers";
import { useLayoutContext } from "../components/LayoutContext";

const CreateWork = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { user } = useLayoutContext();
  const [cid, setCid] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [invoiceNumber] = useState<string>("0");
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [amount] = useState<string>("0");
  const [inquiryMember] = useState<string>("test");
  const [responsibleMember] = useState<string>("test");
  const [po, setPo] = useState<string>("");
  const [acceptanceCheckDate, setAcceptanceCheckDate] = useState<number | Date>(
    new Date().getTime()
  );
  const [toBillDate, setToBillDate] = useState<number | Date>(
    new Date().getTime()
  );
  const [factoryDate, setFactoryDate] = useState<number | Date>(
    new Date().getTime()
  );
  const [assignmentDate, setAssignmentDate] = useState<number | Date>(
    new Date().getTime()
  );
  const [customersOptions, setCustomersOptions] = useState<any>([]);
  console.log(user);

  const handleCreateCustomer = async () => {
    const data = {
      cid: cid,
      name: name,
      invoice_number: invoiceNumber,
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
      create_member: user?.uid,
      update_member: user?.uid,
    };
    setLoading(true);
    try {
      console.log(data);

      const response = await createWork(data);
      if (response.status === 200) {
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
        <Typography variant="h5">建立工單</Typography>
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
                label="工單編號"
                name="name"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
              <TextField
                label="工程名稱"
                name="name"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <TextField
                label="工單類型"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              <TextField
                label="採購PO (複選)"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                name="po"
                value={po}
                onChange={(e) => setPo(e.target.value)}
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
                label="派工作業完成日期"
                value={dayjs(assignmentDate) || ""}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
                onChange={(newValue: any) => {
                  if (newValue) {
                    setAssignmentDate(new Date(newValue.$d).getTime());
                  }
                }}
              />
              <DatePicker
                format="YYYY/MM/DD"
                label="驗收作業完成日期"
                value={dayjs(acceptanceCheckDate) || ""}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
                onChange={(newValue: any) => {
                  if (newValue) {
                    setAcceptanceCheckDate(new Date(newValue.$d).getTime());
                  }
                }}
              />
              <DatePicker
                format="YYYY/MM/DD"
                label="請款作業完成日期"
                value={dayjs(toBillDate) || ""}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
                onChange={(newValue: any) => {
                  if (newValue) {
                    setToBillDate(new Date(newValue.$d).getTime());
                  }
                }}
              />
              <DatePicker
                format="YYYY/MM/DD"
                label="入廠作業完成日期"
                value={dayjs(factoryDate) || ""}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
                onChange={(newValue: any) => {
                  if (newValue) {
                    setFactoryDate(new Date(newValue.$d).getTime());
                  }
                }}
              />
            </Box>
          </>
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
            disabled={
              !cid ||
              !name ||
              !type ||
              !orderNumber ||
              !po ||
              !inquiryMember ||
              !responsibleMember ||
              !acceptanceCheckDate ||
              !toBillDate ||
              !factoryDate ||
              !assignmentDate
            }
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
