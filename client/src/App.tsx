import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Routes, Route, NavLink, useMatch } from "react-router-dom";

import Customers from "./pages/Customers";
import EditCustomers from "./pages/EditCustomers";
import EditWorks from "./pages/EditWorks";
import EditServices from "./pages/EditServices";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Works from "./pages/Works";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

import logo from "../src/assets/images/logo.png";

const pages = [
  {
    name: "追蹤列表",
    url: "/",
  },
  {
    name: "客戶管理",
    url: "/customers",
  },
  {
    name: "客服紀錄",
    url: "/services",
  },
  {
    name: "工單管理",
    url: "/works",
  },
  {
    name: "人員管理",
    url: "/admins",
  },
];
const settings = ["個人資料", "登出"];

function App() {
  const no_auth = useMatch("/login");
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          display: no_auth ? "none" : "block",
        }}>
        <Container
          maxWidth={false}
          sx={{
            py: "0.5rem",
          }}>
          <Toolbar disableGutters>
            <Box
              sx={{
                width: "120px",
                pr: "1rem",
              }}>
              <img
                style={{
                  width: "100%",
                }}
                src={logo}
                alt="logo"
              />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}>
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                ".active": {
                  opacity: 1,
                  fontWeight: 700,
                  transform: "scale(1.1)",
                },
              }}>
              {pages.map((page) => (
                <Button
                  component={NavLink}
                  to={page.url}
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    opacity: 0.5,
                  }}>
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/admins" element={<Admin />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:cid" element={<EditCustomers />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:csid" element={<EditServices />} />
        <Route path="/works" element={<Works />} />
        <Route path="/works/:woid" element={<EditWorks />} />
      </Routes>
    </div>
  );
}

export default App;
