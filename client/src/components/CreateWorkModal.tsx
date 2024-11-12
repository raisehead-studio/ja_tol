import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import { enqueueSnackbar } from "notistack";

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
  const [customerNumber, setCustomerNumber] = useState<any>("");
  const [customerName, setCustomerName] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [invoiceNumber] = useState<string>("0");
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [amount] = useState<string>("0");
  const [inquiryMember] = useState<string>("test");
  const [responsibleMember] = useState<string>("test");
  const [po, setPo] = useState<string>("無");
  const [price, setPrice] = useState<number>(0);
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
  const [taxId, setTaxId] = useState<string>("");

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
      price: price,
    };
    setLoading(true);
    try {
      const res = await createWork(data);
      enqueueSnackbar(res.message, {
        variant: res.status,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      handleClose();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const handleGetCustomers = async () => {
      try {
        setLoading(true);
        const customers = await getCustomers("customer_number", "asc");
        setCustomersOptions(customers);
        setLoading(false);
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

    handleGetCustomers();
  }, []);

  useEffect(() => {
    if (!open) {
      setCid("");
      setName("");
      setOrderNumber("");
      setType("");
      setPo("無");
      setPrice(0);
      setAcceptanceCheckDate(new Date().getTime());
      setToBillDate(new Date().getTime());
      setFactoryDate(new Date().getTime());
      setAssignmentDate(new Date().getTime());
    }
  }, [open]);

  // useEffect(() => {
  //   if (customerNumber) {
  //     const customer = customersOptions.find(
  //       (option: any) => option.customer_number === customerNumber
  //     );
  //     if (customer) {
  //       setCid(customer.cid);
  //       setCustomerName(customer.short_name);
  //     }
  //   }
  // }, [customerNumber, customersOptions, cid]);

  useEffect(() => {
    if (cid) {
      const customer = customersOptions.find(
        (option: any) => option.cid === cid
      );

      if (customer) {
        setCid(customer.cid);
        setCustomerNumber(customer.customer_number);
        setTaxId(customer.tax_id);
      }
    }
  }, [customersOptions, cid]);

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
              <Autocomplete
                disablePortal
                value={customerName}
                options={[
                  {
                    label: "請選擇客戶",
                    cid: "",
                  },
                  ...customersOptions.map((option: any) => {
                    return {
                    label: `${option.short_name} (${option.customer_number}, ${option.tax_id}) `,
                    cid: option.cid,
                  };
                })]}
                fullWidth
                onChange={(
                  event: any,
                  newValue: { label: string; cid: string }
                ) => {
                  if (newValue) {
                    setCid(newValue.cid);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="客戶名稱"
                    value={cid}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                )}
              />
              <TextField
                value={taxId}
                label="客戶編號"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                disabled></TextField>
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
                label="工單種類"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                select>
                <MenuItem value="電力">電力</MenuItem>
                <MenuItem value="紅外線">紅外線</MenuItem>
                <MenuItem value="工程">工程</MenuItem>
                <MenuItem value="維修">維修</MenuItem>
                <MenuItem value="竣工">竣工</MenuItem>
                <MenuItem value="加油站檢測">加油站檢測</MenuItem>
                <MenuItem value="接地檢測">接地檢測</MenuItem>
                <MenuItem value="能源管理">能源管理</MenuItem>
                <MenuItem value="營造開發">營造開發</MenuItem>
                <MenuItem value="其它">其它</MenuItem>
              </TextField>
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
              <TextField
                label="成交金額(未稅)"
                name="name"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={price}
                type={"number"}
                onChange={(e) => setPrice(+e.target.value)}
              />
            </Box>
            {/* <Box
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
            </Box> */}
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
              // !cid ||
              !name ||
              !type ||
              !orderNumber ||
              !po ||
              !inquiryMember ||
              !responsibleMember
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
