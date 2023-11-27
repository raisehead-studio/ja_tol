import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import login_photo from "../assets/images/login.jpg";

import { login } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  const handleLogin = async () => {
    const res = await login(account, pw);
    console.log(res);

    if (res.status === "success") {
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background:
          "linear-gradient(151deg, rgba(117,124,232,0.7049194677871149) 2%, rgba(63,80,181,0.758140756302521) 44%, rgba(117,124,232,0.8057598039215687) 98%)",
      }}>
      <Card sx={{ display: "flex", transform: "translateY(-100px)" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <CardContent sx={{ flex: "1 0 auto", position: "relative" }}>
            <Typography component="div" variant="h5">
              會員登入
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div">
              若無法登入請聯絡客服人員
            </Typography>
            <TextField
              label="帳號"
              name="account"
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              onChange={(e) => setAccount(e.target.value)}
              value={account}
              sx={{ pt: 2 }}
            />
            <TextField
              label="密碼"
              name="pw"
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              onChange={(e) => setPw(e.target.value)}
              value={pw}
              sx={{ pt: 2 }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: "0px",
              }}>
              <Button variant="contained" onClick={handleLogin}>
                登入
              </Button>
            </Box>
          </CardContent>
          <Box
            sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 400 }}
          image={login_photo}
          alt="Live from space album cover"
        />
      </Card>
    </Box>
  );
};

export default Login;
