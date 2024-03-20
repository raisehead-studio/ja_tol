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
import Swal from "sweetalert2";
import TableSortLabel from "@mui/material/TableSortLabel";

import { getWorks, deleteWorks } from "../api/works";
import { WorkResponseDataType } from "../types/works";
import { useLayoutContext } from "../components/LayoutContext";

import CreateWork from "../components/CreateWorkModal";
import WorksModal from "../components/WorksModal";

const Works = () => {
  const [data, setData] = useState([]);
  const [openCreateWorkModal, setOpenCreateWorkModal] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useLayoutContext();
  const navigate = useNavigate();
  const [selectedWoid, setSelectedWoid] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [sort, setSort] = useState<"desc" | "asc" | undefined>("asc");
  const [sortValue, setSortValue] = useState<string>("customer_number");

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
        const customers = await getWorks("notify_date", "asc");
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

  const handleGetWorks = async (orderBy: string, orderType: string) => {
    try {
      setLoading(true);
      const customers = await getWorks(orderBy, orderType);
      setData(customers);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleToggleSort = (value: string) => {
    setSortValue(value);
    setSort(sort === "asc" ? "desc" : "asc");
    handleGetWorks(value, sort === "asc" ? "desc" : "asc");
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = (id: string) => {
    setSelectedWoid(id);
    setOpenModal(true);
  };

  const handleOpenCreateWorkModal = () => {
    setOpenCreateWorkModal(true);
  };

  const handleCloseCreateWorkModal = () => {
    setOpenCreateWorkModal(false);
    return;
  };

  const handleDeleteWork = async (id: string) => {
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
          const response = await deleteWorks(id);
          if (response.code === 200) {
            const works = await getWorks("notify_date", "asc");
            setData(works);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    });
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
            display: user?.permission.is_work_page_insert ? "flex" : "none",
            alignItems: "center",
            gap: "1rem",
            justifyContent: "space-around",
          }}>
          <Box>
            <Typography
              sx={{
                fontSize: "13px",
              }}>
              共有
              <strong>
                {
                  data.filter(
                    (work: WorkResponseDataType) => !work.tobill_tracking_date
                  ).length
                }
              </strong>
              筆未結案工作單
            </Typography>
          </Box>
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
                <TableCell align="left">
                  <TableSortLabel
                    direction={sortValue === "notify_date" ? sort : "asc"}
                    onClick={() => handleToggleSort("notify_date")}
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
                  <TableSortLabel
                    direction={sortValue === "customer_number" ? sort : "asc"}
                    onClick={() => handleToggleSort("customer_number")}
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
                  <TableSortLabel
                    direction={sortValue === "customer_name" ? sort : "asc"}
                    onClick={() => handleToggleSort("customer_name")}
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
                  <TableSortLabel
                    direction={sortValue === "order_number" ? sort : "asc"}
                    onClick={() => handleToggleSort("order_number")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    工單編號
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    direction={sortValue === "work_order_name" ? sort : "asc"}
                    onClick={() => handleToggleSort("work_order_name")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    工程名稱
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">檢測期別</TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    direction={
                      sortValue === "manpower_schedule_started_time"
                        ? sort
                        : "asc"
                    }
                    onClick={() =>
                      handleToggleSort("manpower_schedule_started_time")
                    }
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    備料完成日
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    direction={
                      sortValue === "manpower_schedule_actual_date"
                        ? sort
                        : "asc"
                    }
                    onClick={() =>
                      handleToggleSort("manpower_schedule_actual_date")
                    }
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    預計排程日
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    direction={
                      sortValue === "manufacturing_date" ? sort : "asc"
                    }
                    onClick={() => handleToggleSort("manufacturing_date")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    實際排程日
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    direction={sortValue === "receive_date" ? sort : "asc"}
                    onClick={() => handleToggleSort("receive_date")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    外部聯絡單回覆日
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    direction={
                      sortValue === "tai_power_notify_date" ? sort : "asc"
                    }
                    onClick={() => handleToggleSort("tai_power_notify_date")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    通知台電日
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    direction={
                      sortValue === "is_assign_manpower" ? sort : "asc"
                    }
                    onClick={() => handleToggleSort("is_assign_manpower")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    人力安排
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    direction={
                      sortValue === "factory_tracking_date" ? sort : "asc"
                    }
                    onClick={() => handleToggleSort("factory_tracking_date")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    入廠資料完成
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    direction={sortValue === "report_status" ? sort : "asc"}
                    onClick={() => handleToggleSort("report_status")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    報告書追蹤
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    direction={sortValue === "photo_download" ? sort : "asc"}
                    onClick={() => handleToggleSort("photo_download")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    施工照片
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    direction={
                      sortValue === "manufacturing_date" ? sort : "asc"
                    }
                    onClick={() => handleToggleSort("manufacturing_date")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    驗收資料完成日
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    direction={
                      sortValue === "acceptance_check_tracking_date"
                        ? sort
                        : "asc"
                    }
                    onClick={() =>
                      handleToggleSort("acceptance_check_tracking_date")
                    }
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    請款狀態
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    direction={
                      sortValue === "tobill_tracking_date" ? sort : "asc"
                    }
                    onClick={() => handleToggleSort("tobill_tracking_date")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    工單狀態
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    direction={sort}
                    onClick={() => handleToggleSort("update_member")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    上次編輯者
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    direction={sort}
                    onClick={() => handleToggleSort("update_date")}
                    sx={{
                      color: "white !important",
                      ".MuiTableSortLabel-icon": {
                        color: "white !important",
                      },
                    }}
                    active={true}>
                    上次編輯日期
                  </TableSortLabel>
                </TableCell>
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
                        onClick={() => handleOpenModal(work.id)}
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
                        onClick={() => {
                          handleDeleteWork(work.id);
                        }}
                        disabled={!user?.permission.is_work_page_delete}
                        size="small">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="left">
                    {dayjs(work.notify_date).format("YYYY/MM/DD")}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {work.customer_number}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {work.customer_name}
                  </TableCell>
                  <TableCell align="left">{work.order_number}</TableCell>
                  <TableCell align="left">{work.work_order_name}</TableCell>
                  <TableCell align="left">{work.test || "--"}</TableCell>
                  <TableCell align="left">
                    {work.manufacturing_date
                      ? dayjs(work.manufacturing_date).format("YYYY/MM/DD")
                      : "--"}
                  </TableCell>
                  <TableCell align="left">
                    {work.manpower_schedule_started_time
                      ? dayjs(work.manpower_schedule_started_time).format(
                          "YYYY/MM/DD"
                        )
                      : "--"}
                  </TableCell>
                  <TableCell align="left">
                    {work.manpower_schedule_actual_date
                      ? dayjs(work.manpower_schedule_actual_date).format(
                          "YYYY/MM/DD"
                        )
                      : "--"}
                  </TableCell>
                  <TableCell align="left">
                    {work.receive_date
                      ? dayjs(work.receive_date).format("YYYY/MM/DD")
                      : "--"}
                  </TableCell>
                  <TableCell align="left">
                    {work.tai_power_notify_date
                      ? dayjs(work.tai_power_notify_date).format("YYYY/MM/DD")
                      : "--"}
                  </TableCell>
                  <TableCell align="left">
                    {work.is_assign_manpower ? "已完成" : "未完成"}
                  </TableCell>
                  <TableCell align="left">
                    {work.factory_tracking_date
                      ? dayjs(work.factory_tracking_date).format("YYYY/MM/DD")
                      : "--"}
                  </TableCell>
                  <TableCell align="left">
                    {work.report_status
                      ? dayjs(work.report_status).format("YYYY/MM/DD")
                      : "--"}
                  </TableCell>
                  <TableCell align="left">
                    {" "}
                    {work.photo_download
                      ? dayjs(work.photo_download).format("YYYY/MM/DD")
                      : "--"}
                  </TableCell>
                  <TableCell align="left">
                    {work.acceptance_check_tracking_date
                      ? dayjs(work.acceptance_check_tracking_date).format(
                          "YYYY/MM/DD"
                        )
                      : "--"}
                  </TableCell>
                  <TableCell align="left">
                    {work.tobill_tracking_date
                      ? dayjs(work.tobill_tracking_date).format("YYYY/MM/DD")
                      : "--"}
                  </TableCell>
                  <TableCell align="left">
                    {work.tobill_finished_date ? "已結案" : "未結案"}
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
      <WorksModal
        open={openModal}
        handleClose={handleCloseModal}
        woid={selectedWoid}
      />
    </Box>
  );
};

export default Works;
