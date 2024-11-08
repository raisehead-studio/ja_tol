import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {
  Routes,
  Route,
  NavLink,
  useMatch,
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";

import Customers from "./pages/Customers";
import EditCustomers from "./pages/EditCustomers";
import EditWorks from "./pages/EditWorks";
import EditServices from "./pages/EditServices";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Works from "./pages/Works";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import EditAdmin from "./pages/EditMember";
import ProtectedRoute from "./components/ProtectedRoute";

import { useLayoutContext } from "./components/LayoutContext";

import logo from "../src/assets/images/logo.png";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const settings = [
    {
      name: "個人資料",
      func: () => {
        handleCloseUserMenu();
      },
    },
    {
      name: "登出",
      func: () => {
        localStorage.clear();
        navigate("/login");
        handleCloseUserMenu();
      },
    },
  ];

  let [menu, setMenu] = useState<any>(null);
  const { user } = useLayoutContext();
  

  const no_auth = useMatch("/login");

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const pages = [
      {
        name: "追蹤列表",
        url: "/",
        is_show: "is_tracking_page",
      },
      {
        name: "客戶管理",
        url: "/customers",
        is_show: "is_customer_page",
      },
      {
        name: "客服紀錄",
        url: "/services",
        is_show: "is_service_page",
      },
      {
        name: "工單管理",
        url: "/works",
        is_show: "is_work_page",
      },
      {
        name: "人員管理",
        url: "/admins",
        is_show: "is_admin_page",
      },
    ];
    setMenu(
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
            onClick={(e) => {
              if (location.pathname.match(/^\/customers\/.*/) && page.url === '/customers') {
                e.preventDefault();
                if (!window.confirm('請確認資料確實儲存再行離開此頁面。')) {
                  return;
                }
                navigate('/customers');
              }
            }}
            key={page.name}
            sx={{
              my: 2,
              color: "white",
              display: user?.permission[page.is_show] ? "block" : "none",
              opacity: 0.5,
            }}>
            {page.name}
          </Button>
        ))}
      </Box>
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, location]);

  return (
    <Box
      sx={{
        height: "100vh",
        minHeight: "100vh",
        overflowY: "visible",
        position: "relative",
      }}>
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
              <Link to="/">
                <img
                  style={{
                    width: "100%",
                  }}
                  src={logo}
                  alt="logo"
                />
              </Link>
            </Box>

            {menu}

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user?.name || ""}
                    src="/static/images/avatar/2.jpg"
                  />
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
                  <MenuItem key={setting.name} onClick={setting.func}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admins"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admins/:uid"
          element={
            <ProtectedRoute>
              <EditAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/:cid"
          element={
            <ProtectedRoute>
              <EditCustomers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services/:csid"
          element={
            <ProtectedRoute>
              <EditServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/works"
          element={
            <ProtectedRoute>
              <Works />
            </ProtectedRoute>
          }
        />
        <Route
          path="/works/:woid"
          element={
            <ProtectedRoute>
              <EditWorks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Box>
  );
}

export default App;
