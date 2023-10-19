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

import { getWorks } from "../api/works";

import { WorkResponseDataType } from "../types/works";

import CreateWork from "../components/CreateWorkModal";

const Works = () => {
  const [data, setData] = useState([]);
  const [openCreateWorkModal, setOpenCreateWorkModal] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const handleGetWorks = async () => {
  //     try {
  //       setLoading(true);
  //       const customers = await getWorks();
  //       setData(customers);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       setLoading(false);
  //     }
  //   };

  //   handleGetWorks();
  // }, [openCreateWorkModal]);

  useEffect(() => {
    const handleGetWorks = async () => {
      try {
        setLoading(true);
        const customers = await getWorks();
        setData(customers);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    handleGetWorks();
  }, []);

  // const handleCloseModal = () => {
  //   setSelectedCustomer("");
  //   return;
  // };

  // const handleOpenModal = (cid: string) => {
  //   setSelectedCustomer(cid);
  // };

  const handleOpenCreateWorkModal = () => {
    setOpenCreateWorkModal(true);
  };

  const handleCloseCreateWorkModal = () => {
    setOpenCreateWorkModal(false);
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
        <Typography variant="h5">工作單詳細資料列表</Typography>
        <Box>
          <Button onClick={handleOpenCreateWorkModal}>
            <Typography variant="button">新增工作單</Typography>
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
                <TableCell align="left">工單編號</TableCell>
                <TableCell align="left">工程名稱</TableCell>
                <TableCell align="left">派工材料準備</TableCell>
                <TableCell align="left">派工施工日期</TableCell>
                <TableCell align="left">派工人力安排</TableCell>
                <TableCell align="left">入廠資料準備</TableCell>
                <TableCell align="left">驗收</TableCell>
                <TableCell align="left">驗收報告書</TableCell>
                <TableCell align="left">請款</TableCell>
                <TableCell align="left">工作單狀態</TableCell>
                <TableCell align="left">提醒日期</TableCell>
                <TableCell align="left">上次編輯者</TableCell>
                <TableCell align="left">上次編輯日期</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((work: WorkResponseDataType) => (
                <TableRow
                  key={work.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {work.customer_number}
                  </TableCell>
                  <TableCell align="left">{work.customer_name}</TableCell>
                  <TableCell align="left">{work.order_number}</TableCell>
                  <TableCell align="left">{work.work_order_name}</TableCell>
                  <TableCell align="left">--</TableCell>
                  <TableCell align="left">--</TableCell>
                  <TableCell align="left">--</TableCell>
                  <TableCell align="left">--</TableCell>
                  <TableCell align="left">--</TableCell>
                  <TableCell align="left">--</TableCell>
                  <TableCell align="left">--</TableCell>
                  <TableCell align="left">--</TableCell>
                  <TableCell align="left">{work.notify_date}</TableCell>
                  <TableCell align="left">{work.update_date}</TableCell>
                  <TableCell align="left">{work.update_member}</TableCell>
                  <TableCell align="left">
                    <Button onClick={() => {}}>檢視</Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => {
                        navigate(`/customers/${work.id}`);
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
      <CreateWork
        open={openCreateWorkModal}
        handleClose={handleCloseCreateWorkModal}
      />
    </Box>
  );
};

export default Works;
