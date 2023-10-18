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

import { getServices } from "../api/services";

import { CustomersResponseType } from "../types/customers";

import CreateService from "../components/CreateServiceModal";

const Services = () => {
  const [data, setData] = useState([]);
  const [openCreateServiceModal, setOpenCreateServiceModal] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const handleGetCustomers = async () => {
      try {
        setLoading(true);
        const services = await getServices();
        setData(services);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    handleGetCustomers();
  }, []);

  // useEffect(() => {
  //   const handleGetCustomers = async () => {
  //     try {
  //       const customers = await getCustomers();
  //       setLoading(true);
  //       setData(customers);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       setLoading(false);
  //     }
  //   };

  //   handleGetCustomers();
  // }, []);

  // const handleCloseModal = () => {
  //   setSelectedCustomer("");
  //   return;
  // };

  // const handleOpenModal = (cid: string) => {
  //   setOpenCreateServiceModal(cid);
  // };

  const handleOpenCreateCustomerModal = () => {
    setOpenCreateServiceModal(true);
  };

  const handleCloseCreateCustomerModal = () => {
    setOpenCreateServiceModal(false);
    return;
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
        <Typography variant="h5">客服資料列表</Typography>
        <Box>
          <Button onClick={handleOpenCreateCustomerModal}>
            <Typography variant="button">新增客服資料</Typography>
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead
              sx={{
                backgroundColor: "#f5f5f5",
              }}>
              <TableRow>
                <TableCell align="left">客戶編號</TableCell>
                <TableCell align="left">客戶名稱</TableCell>
                <TableCell align="left">客戶簡稱</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((customer: CustomersResponseType) => (
                <TableRow
                  key={customer.cid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {customer.customer_number}
                  </TableCell>
                  <TableCell align="left">{customer.name}</TableCell>
                  <TableCell align="left">{customer.short_name}</TableCell>
                  <TableCell align="left">
                    <Button onClick={() => {}}>檢視</Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => {
                        navigate(`/customers/${customer.cid}`);
                      }}>
                      編輯
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <CreateService
        open={openCreateServiceModal}
        handleClose={handleCloseCreateCustomerModal}
      />
    </Box>
  );
};

export default Services;
