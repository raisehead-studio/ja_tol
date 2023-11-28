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
import DeleteIcon from "@mui/icons-material/Delete";

import { getWorks } from "../api/works";
import { WorkResponseDataType } from "../types/works";
import { useLayoutContext } from "../components/LayoutContext";

import CreateWork from "../components/CreateWorkModal";

const Works = () => {
  const [data, setData] = useState([]);
  const [openCreateWorkModal, setOpenCreateWorkModal] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useLayoutContext();
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

    if (!openCreateWorkModal) {
      handleGetWorks();
    }
  }, [openCreateWorkModal]);

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
        <Box
          sx={{
            display: user?.permission.is_work_page_insert ? "block" : "none",
          }}>
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
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((work: WorkResponseDataType) => (
                <TableRow
                  key={work.id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="left">
                    <Tooltip title="檢視">
                      <IconButton
                        // onClick={() => handleOpenModal(customer.cid)}
                        size="small"
                        disabled={!user?.permission.is_work_page_read}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left">
                    <Tooltip title="編輯">
                      <IconButton
                        onClick={() => {
                          navigate(`/works/${work.id}`);
                        }}
                        size="small"
                        disabled={!user?.permission.is_work_page_update}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left">
                    <Tooltip title="刪除">
                      <IconButton
                        disabled={!user?.permission.is_work_page_delete}
                        size="small">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
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
                  <TableCell align="left">
                    {dayjs(work.notify_date).format("YYYY/MM/DD")}
                  </TableCell>
                  <TableCell align="left">{work.update_member}</TableCell>
                  <TableCell align="left">
                    {dayjs(work.update_date).format("YYYY/MM/DD")}
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
