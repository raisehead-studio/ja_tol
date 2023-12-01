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
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";

import { getCustomers, deleteCustomer } from "../api/customers";
import { CustomersResponseType } from "../types/customers";
import { useLayoutContext } from "../components/LayoutContext";

import CustomersModal from "../components/CustomersModal";
import CreateCustomerModal from "../components/CreateCustomerModal";

const Customers = () => {
  const [data, setData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [openCreateCustomerModal, setOpenCreateCustomerModal] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useLayoutContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetCustomers = async () => {
      try {
        setLoading(true);
        const customers = await getCustomers();
        setData(customers);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (!openCreateCustomerModal) handleGetCustomers();
  }, [openCreateCustomerModal]);

  useEffect(() => {
    const handleGetCustomers = async () => {
      try {
        const customers = await getCustomers();
        setLoading(true);
        setData(customers);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    handleGetCustomers();
  }, []);

  const handleCloseModal = () => {
    setSelectedCustomer("");
    return;
  };

  const handleOpenModal = (cid: string) => {
    setSelectedCustomer(cid);
  };

  const handleOpenCreateCustomerModal = () => {
    setOpenCreateCustomerModal(true);
  };

  const handleCloseCreateCustomerModal = () => {
    setOpenCreateCustomerModal(false);
    return;
  };

  const handleDeleteCustomer = async (cid: string) => {
    try {
      setLoading(true);
      await deleteCustomer(cid);
      const customers = await getCustomers();
      setData(customers);
      setLoading(false);
    } catch (er) {
      setLoading(false);
    }
  };

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
        <Typography variant="h5">客戶資料列表</Typography>
        <Box
          sx={{
            display: user?.permission.is_customer_page_insert
              ? "block"
              : "none",
          }}>
          <Button onClick={handleOpenCreateCustomerModal}>
            <Typography variant="button">新增客戶</Typography>
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
                <TableCell align="left">客戶編號</TableCell>
                <TableCell align="left">客戶名稱</TableCell>
                <TableCell align="left">客戶簡稱</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((customer: CustomersResponseType) => (
                <TableRow
                  hover
                  key={customer.cid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="left">
                    <Tooltip title="檢視">
                      <IconButton
                        onClick={() => handleOpenModal(customer.cid)}
                        size="small"
                        disabled={!user?.permission.is_customer_page_read}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left">
                    <Tooltip title="編輯">
                      <IconButton
                        onClick={() => {
                          navigate(`/customers/${customer.cid}`);
                        }}
                        size="small"
                        disabled={!user?.permission.is_customer_page_update}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left">
                    <Tooltip title="刪除">
                      <IconButton
                        disabled={!user?.permission.is_customer_page_delete}
                        size="small"
                        onClick={() => handleDeleteCustomer(customer.cid)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {customer.customer_number}
                  </TableCell>
                  <TableCell align="left">{customer.name}</TableCell>
                  <TableCell align="left">{customer.short_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <CustomersModal
        cid={selectedCustomer}
        open={selectedCustomer !== ""}
        handleClose={handleCloseModal}
      />
      <CreateCustomerModal
        open={openCreateCustomerModal}
        handleClose={handleCloseCreateCustomerModal}
      />
    </Box>
  );
};

export default Customers;
