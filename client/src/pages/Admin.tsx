import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";

import { useLayoutContext } from "../components/LayoutContext";
import { UsersType } from "../types/users";
import { getUsers, deleteUser } from "../api/users";

import CreateMember from "../components/CreateMember";

const Admin = () => {
  const [data, setData] = useState<UsersType[]>([]);
  const [openCreateMemberModal, setOpenCreateMemberModal] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useLayoutContext();
  const navigate = useNavigate();
  let user_data = user;

  const handleOpenCreateMember = () => setOpenCreateMemberModal(true);

  const handleCloseCreateMember = () => setOpenCreateMemberModal(false);

  const handleDeleteUser = async (uid: string | undefined) => {
    Swal.fire({
      title: "系統訊息",
      text: "您確定要刪除此筆資料?(資料刪除後將無法復原)",
      showCancelButton: true,
      cancelButtonText: "取消",
      confirmButtonText: "確定",
      confirmButtonColor: "#3f50b5",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const response = await deleteUser(uid);
          if (response.code === 200) {
            const users = await getUsers();
            setData(users);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    });
  };

  useEffect(() => {
    const handleGetUsers = async () => {
      try {
        setLoading(true);
        const users = await getUsers();
        setData(users);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (!openCreateMemberModal) {
      handleGetUsers();
    }
  }, [openCreateMemberModal]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        gap: "1rem",
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}>
        <Typography variant="h5">人員列表</Typography>
        <Box>
          <Button
            onClick={handleOpenCreateMember}
            sx={{
              display: user_data?.permission.is_admin_page_insert
                ? "block"
                : "none",
            }}>
            <Typography variant="button">新增人員</Typography>
          </Button>
        </Box>
      </Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 68.5px - 120px)",
          }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ maxHeight: "calc(100vh - 84.5px - 2rem - 32px - 37px)" }}>
          <Table
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="a dense table"
            stickyHeader>
            <TableHead
              sx={(s) => ({
                backgroundColor: s.palette.primary.main,
                tr: {
                  backgroundColor: "inherit !important",

                  th: {
                    backgroundColor: "inherit !important",
                    color: "white",
                  },
                },
              })}>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{
                    width: "5%",
                  }}></TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "5%",
                  }}></TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "5%",
                  }}></TableCell>
                <TableCell align="left">人員帳號</TableCell>
                <TableCell align="left">人員名稱</TableCell>
                <TableCell align="left">人員權限</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((user: UsersType) => {
                let display_role;
                switch (user.role) {
                  case "admin":
                    display_role = "管理員";
                    break;
                  case "operator":
                    display_role = "行政人員";
                    break;
                  case "engineer":
                    display_role = "工程師";
                    break;
                  default:
                    display_role = "無角色";
                    break;
                }
                return (
                  <TableRow
                    hover
                    key={user.uid}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}>
                    <TableCell align="left">
                      <Tooltip title="檢視">
                        <IconButton
                          // onClick={() => handleOpenModal(customer.cid)}
                          disabled={!user_data?.permission.is_admin_page_read}
                          size="small">
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left">
                      <Tooltip title="編輯">
                        <IconButton
                          onClick={() => {
                            navigate(`/admins/${user.uid}`);
                          }}
                          disabled={!user_data?.permission.is_admin_page_update}
                          size="small">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left">
                      <Tooltip title="刪除">
                        <IconButton
                          onClick={() => {
                            console.log("I am here");
                            handleDeleteUser(user.uid);
                          }}
                          disabled={!user_data?.permission.is_admin_page_delete}
                          size="small">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.account}
                    </TableCell>

                    <TableCell align="left">{user.name}</TableCell>
                    <TableCell align="left">{display_role}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <CreateMember
        open={openCreateMemberModal}
        handleClose={handleCloseCreateMember}
      />
    </Box>
  );
};

export default Admin;
