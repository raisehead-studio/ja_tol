import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import TableSortLabel from "@mui/material/TableSortLabel";
import dayjs from "dayjs";

import { getTrackings } from "../api/tracking";
import { useLayoutContext } from "../components/LayoutContext";
import { TrackingDataType } from "../types/tracking";

import CustomersModal from "../components/ServiceContentModal";
import WorksModal from "../components/WorksModal";

const Home = () => {
  const [data, setData] = useState<TrackingDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openWorkModal, setOpenWorkModal] = useState<boolean>(false);
  const [openCustomerModal, setOpenCustomerModal] = useState<boolean>(false);
  const [woid, setWoid] = useState<string>("");
  const [cid, setCid] = useState<string>("");
  const [orderType, setOrderType] = useState<"asc" | "desc">("desc");
  const [orderBy, setOrderBy] = useState<string>("notify_date");

  const { user } = useLayoutContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetTrackings = async () => {
      try {
        setLoading(true);
        const data = await getTrackings("notify_date", "desc");
        setData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    handleGetTrackings();
  }, []);

  const handleOpenWorkModal = (id: string) => {
    setWoid(id);
    setOpenWorkModal(true);
  };

  const handleCloseWorkModal = () => setOpenWorkModal(false);

  const handleOpenCustomerModal = (id: string) => {
    setCid(id);
    setOpenCustomerModal(true);
  };

  const handleCloseCustomerModal = () => setOpenCustomerModal(false);

  const handleGetSortData = async (orderBy: string) => {
    setOrderBy(orderBy);

    if (orderType === "asc") {
      setOrderType("desc");
    } else {
      setOrderType("asc");
    }

    try {
      setLoading(true);
      const data = await getTrackings(orderBy, orderType);
      setData(data);
      setLoading(false);
    } catch (error) {
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
        <Typography variant="h5">追蹤列表</Typography>
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
                    width: "2.5%",
                  }}></TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "2.5%",
                  }}></TableCell>
                <TableCell
                  align="left"
                  sx={{
                    width: "8%",
                  }}>
                  <TableSortLabel
                    direction={orderBy === "notify_date" ? orderType : "desc"}
                    onClick={() => handleGetSortData("notify_date")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    追蹤日期
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <TableSortLabel
                    direction={
                      orderBy === "customer_number" ? orderType : "desc"
                    }
                    onClick={() => handleGetSortData("customer_number")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    客戶編號
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <TableSortLabel
                    direction={orderBy === "short_name" ? orderType : "desc"}
                    onClick={() => handleGetSortData("short_name")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    客戶簡稱
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <TableSortLabel
                    direction={
                      orderBy === "work_order_number" ? orderType : "desc"
                    }
                    onClick={() => handleGetSortData("work_order_number")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    工單編號/客服紀錄
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <TableSortLabel
                    direction={orderBy === "item" ? orderType : "desc"}
                    onClick={() => handleGetSortData("item")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    工程名稱/客服紀錄類型
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <TableSortLabel
                    direction={orderBy === "description" ? orderType : "desc"}
                    onClick={() => handleGetSortData("description")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    客服紀錄主旨（作業紀錄）
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <TableSortLabel
                    direction={orderBy === "update_member" ? orderType : "desc"}
                    onClick={() => handleGetSortData("update_member")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    最新編輯者
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  {" "}
                  <TableSortLabel
                    direction={orderBy === "update_date" ? orderType : "desc"}
                    onClick={() => handleGetSortData("update_date")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    最新編輯時間
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((i: TrackingDataType) => {
                let is_due =
                  dayjs(i.notify_date).isAfter(dayjs(), "day") ||
                  i.notify_date === 0;
                return (
                  <TableRow
                    hover
                    key={i.id}
                    sx={(theme) => ({
                      "&:last-child td, &:last-child th": { border: 0 },
                      ".MuiTableCell-root": {
                        color: is_due ? "black" : theme.palette.error.main,
                        fontWeight: is_due ? "normal" : "bold",
                      },
                    })}>
                    <TableCell align="left">
                      <Tooltip title="檢視">
                        <IconButton
                          onClick={
                            i.work_order_number === "客服紀錄"
                              ? () => handleOpenCustomerModal(i.id)
                              : () => handleOpenWorkModal(i.id)
                          }
                          disabled={!user?.permission.is_tracking_page_read}
                          size="small">
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left">
                      <Tooltip title="編輯">
                        <IconButton
                          onClick={() => {
                            navigate(
                              `/${
                                i.work_order_number === "客服紀錄"
                                  ? "services"
                                  : "works"
                              }/${i.id}`
                            );
                          }}
                          disabled={!user?.permission.is_tracking_page_update}
                          size="small">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {i.notify_date === 0
                        ? "--"
                        : dayjs(i.notify_date).format("YYYY/MM/DD")}
                    </TableCell>
                    <TableCell align="left">{i.customer_number}</TableCell>
                    <TableCell align="left">{i.short_name}</TableCell>
                    <TableCell align="left">{i.work_order_number}</TableCell>
                    <TableCell align="left">{i.item}</TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        width: "20%",
                      }}>
                      {i.description}
                    </TableCell>
                    <TableCell align="left">{i.update_member}</TableCell>
                    <TableCell align="left">
                      {dayjs(i.update_date).format("YYYY/MM/DD")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <CustomersModal
        open={openCustomerModal}
        handleClose={handleCloseCustomerModal}
        csid={cid}
      />
      <WorksModal
        open={openWorkModal}
        handleClose={handleCloseWorkModal}
        woid={woid}
      />
    </Box>
  );
};

export default Home;
