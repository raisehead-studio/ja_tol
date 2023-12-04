import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { enqueueSnackbar } from "notistack";

import { createUser } from "../api/users";

const CreateCustomer = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [memberName, setMemberName] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateCustomer = async () => {
    const data = {
      name: memberName,
      account: account,
      password: pw,
      role: role,
    };
    try {
      setLoading(true);
      const res = await createUser(data);
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
      setMemberName("");
      setAccount("");
      setPw("");
      setRole("");
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
            <Typography variant="h5">建立人員</Typography>
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
                  label="帳號"
                  name="account"
                  value={account}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={(e) => {
                    setAccount(e.target.value);
                  }}
                />
                <TextField
                  label="密碼"
                  name="pw"
                  value={pw}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={(e) => {
                    setPw(e.target.value);
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
                  label="人員名稱"
                  name="customerNumber"
                  value={memberName}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={(e) => {
                    setMemberName(e.target.value);
                  }}
                />
                <TextField
                  label="角色"
                  name="role"
                  value={role}
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  select>
                  <MenuItem value="admin">管理員</MenuItem>
                  <MenuItem value="operator">行政人員</MenuItem>
                  <MenuItem value="engineer">工程師</MenuItem>
                </TextField>
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
                disabled={!memberName || !account || !pw || !role}
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
