import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UpdateIcon from "@mui/icons-material/Update";
import { MenuItem, TextField } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { getUser } from "../api/users";

const CreateCustomer = () => {
  let { uid } = useParams();
  const [memberName, setMemberName] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const navigate = useNavigate();

  const handleCreateCustomer = async () => {};

  useEffect(() => {
    const handleGetUser = async (uid: string) => {
      try {
        const user = await getUser(uid);
        setMemberName(user.name);
        setAccount(user.account);
        setPw(user.password);
        setRole(user.role);
      } catch (error) {
        console.log(error);
      }
    };
    if (uid) {
      handleGetUser(uid);
    }
  }, [uid]);

  return (
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
      <Typography variant="h5">編輯人員資料</Typography>
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
            type="password"
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
      <Typography variant="h5">追蹤列表</Typography>
      <FormGroup sx={{ flexDirection: "row", gap: 5 }}>
        <FormControlLabel
          control={<Switch size="small" />}
          label="新增"
          labelPlacement="start"
        />
        <FormControlLabel
          control={<Switch size="small" />}
          label="編輯"
          labelPlacement="start"
        />{" "}
        <FormControlLabel
          control={<Switch size="small" />}
          label="查看"
          labelPlacement="start"
        />{" "}
        <FormControlLabel
          control={<Switch size="small" />}
          label="刪除"
          labelPlacement="start"
        />
      </FormGroup>
      <Typography variant="h5">客戶管理</Typography>
      <FormGroup sx={{ flexDirection: "row", gap: 5 }}>
        <FormControlLabel
          control={<Switch size="small" />}
          label="新增"
          labelPlacement="start"
        />
        <FormControlLabel
          control={<Switch size="small" />}
          label="編輯"
          labelPlacement="start"
        />{" "}
        <FormControlLabel
          control={<Switch size="small" />}
          label="查看"
          labelPlacement="start"
        />{" "}
        <FormControlLabel
          control={<Switch size="small" />}
          label="刪除"
          labelPlacement="start"
        />
      </FormGroup>
      <Typography variant="h5">客服紀錄</Typography>
      <FormGroup sx={{ flexDirection: "row", gap: 5 }}>
        <FormControlLabel
          control={<Switch size="small" />}
          label="新增"
          labelPlacement="start"
        />
        <FormControlLabel
          control={<Switch size="small" />}
          label="編輯"
          labelPlacement="start"
        />{" "}
        <FormControlLabel
          control={<Switch size="small" />}
          label="查看"
          labelPlacement="start"
        />{" "}
        <FormControlLabel
          control={<Switch size="small" />}
          label="刪除"
          labelPlacement="start"
        />
      </FormGroup>
      <Typography variant="h5">工單管理</Typography>
      <FormGroup sx={{ flexDirection: "row", gap: 5 }}>
        <FormControlLabel
          control={<Switch size="small" />}
          label="新增"
          labelPlacement="start"
        />
        <FormControlLabel
          control={<Switch size="small" />}
          label="編輯"
          labelPlacement="start"
        />{" "}
        <FormControlLabel
          control={<Switch size="small" />}
          label="查看"
          labelPlacement="start"
        />{" "}
        <FormControlLabel
          control={<Switch size="small" />}
          label="刪除"
          labelPlacement="start"
        />
      </FormGroup>
      <Typography variant="h5">人員管理</Typography>
      <FormGroup sx={{ flexDirection: "row", gap: 5 }}>
        <FormControlLabel
          control={<Switch size="small" />}
          label="新增"
          labelPlacement="start"
        />
        <FormControlLabel
          control={<Switch size="small" />}
          label="編輯"
          labelPlacement="start"
        />{" "}
        <FormControlLabel
          control={<Switch size="small" />}
          label="查看"
          labelPlacement="start"
        />{" "}
        <FormControlLabel
          control={<Switch size="small" />}
          label="刪除"
          labelPlacement="start"
        />
      </FormGroup>
      <Divider />
      <Box
        sx={{
          position: "sticky",
          bottom: "1rem",
          right: "1rem",
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
        }}>
        <Button
          startIcon={<ArrowBackIosIcon />}
          variant="contained"
          onClick={() => navigate(-1)}>
          回到上一頁
        </Button>
        <Button
          startIcon={<UpdateIcon />}
          disabled={!memberName || !account || !pw || !role}
          variant="contained"
          onClick={handleCreateCustomer}>
          儲存
        </Button>
      </Box>
    </Box>
  );
};

export default CreateCustomer;
