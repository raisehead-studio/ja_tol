import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { enqueueSnackbar } from "notistack";

import { createCustomer } from "../api/customers";

import { CustomerRequestDataType } from "../types/customers";
import { TextField } from "@mui/material";

const CreateCustomer = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [customerNumber, setCustomerNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [shortName, setShortName] = useState<string>("");
  const [eleNumber, setEleNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [taxId, setTaxId] = useState<string | null>(null);

  const handleCreateCustomer = async () => {
    const data: CustomerRequestDataType = {
      customer_number: customerNumber,
      name: name,
      short_name: shortName,
      ele_number: eleNumber,
      tax_id: taxId || "",
    };
    setLoading(true);
    try {
      const res = await createCustomer(data);
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
      setCustomerNumber("");
      setName("");
      setShortName("");
      setEleNumber("");
      setTaxId("");
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
            <Typography variant="h5">建立顧客</Typography>
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
                {/* <TextField
                  label="電號"
                  name="eleNumber"
                  value={eleNumber}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={(e) => {
                    setEleNumber(e.target.value);
                  }}
                /> */}
                <TextField
                  label="客戶名稱"
                  name="name"
                  value={name}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <TextField
                  label="統一編號"
                  name="tax_id"
                  value={taxId || ""}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={(e) => {
                    setTaxId(e.target.value);
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
                  label="客戶編號"
                  name="customerNumber"
                  value={customerNumber}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={(e) => {
                    setCustomerNumber(e.target.value);
                  }}
                />
                <TextField
                  label="客戶簡稱"
                  name="shortName"
                  value={shortName}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={(e) => {
                    setShortName(e.target.value);
                  }}
                />
              </Box>
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
                disabled={!customerNumber || !name || !shortName}
                variant="contained"
                onClick={handleCreateCustomer}>
                建立
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CreateCustomer;
