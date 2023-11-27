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
import dayjs from "dayjs";

import { getServices } from "../api/services";
import { ServiceResponseDataType } from "../types/services";
import CreateService from "../components/CreateServiceModal";
import ViewServiceContent from "../components/ServiceContentModal";

const Services = () => {
  const [data, setData] = useState([]);
  const [openCreateServiceModal, setOpenCreateServiceModal] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedService, setSelectedService] = useState<string>("");

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

    if (!openCreateServiceModal) handleGetCustomers();
  }, [openCreateServiceModal]);

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

  const handleCloseModal = () => {
    setSelectedService("");
    return;
  };

  const handleOpenModal = (csid: string) => {
    setSelectedService(csid);
  };

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
                <TableCell align="left">客戶編號</TableCell>
                <TableCell align="left">客戶名稱</TableCell>
                <TableCell align="left">建立日期</TableCell>
                <TableCell align="left">客戶服務狀態</TableCell>
                <TableCell align="left">客戶紀錄類別</TableCell>
                <TableCell align="left">客戶紀錄類標題</TableCell>
                <TableCell align="left">追蹤日期</TableCell>
                <TableCell align="left">上次編輯者</TableCell>
                <TableCell align="left">上次編輯日期</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((service: ServiceResponseDataType) => {
                let customer_status;
                switch (service.status) {
                  case "in_progress":
                    customer_status = "進行中";
                    break;
                  case "done":
                    customer_status = "已完成";
                    break;
                  case "closed":
                    customer_status = "已結案";
                    break;
                  default:
                    customer_status = "未知";
                    break;
                }

                return (
                  <TableRow
                    key={service.id}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}>
                    <TableCell align="left">
                      <Tooltip title="檢視">
                        <IconButton
                          onClick={() => handleOpenModal(service.id)}
                          size="small">
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left">
                      <Tooltip title="編輯">
                        <IconButton
                          onClick={() => {
                            navigate(`/services/${service.id}`);
                          }}
                          size="small">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {service.customer_number}
                    </TableCell>
                    <TableCell align="left">{service.short_name}</TableCell>
                    <TableCell align="left">
                      {dayjs(service.update_date).format("YYYY/MM/DD")}
                    </TableCell>
                    <TableCell align="left">{customer_status}</TableCell>
                    <TableCell align="left">{service.type}</TableCell>
                    <TableCell align="left">{service.title}</TableCell>
                    <TableCell align="left">
                      {dayjs(service.notify_date).format("YYYY/MM/DD")}
                    </TableCell>
                    <TableCell align="left">{service.update_member}</TableCell>
                    <TableCell align="left">
                      {dayjs(service.update_date).format("YYYY/MM/DD")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <CreateService
        open={openCreateServiceModal}
        handleClose={handleCloseCreateCustomerModal}
      />
      <ViewServiceContent
        open={Boolean(selectedService)}
        handleClose={handleCloseModal}
        csid={selectedService}
      />
    </Box>
  );
};

export default Services;
