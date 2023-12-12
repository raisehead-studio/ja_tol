import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UpdateIcon from "@mui/icons-material/Update";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";

import { ServiceDetailResponseDataType } from "../types/services";
import { getServiceDetail, handleUpdateServiceDetail } from "../api/services";
import CreateServiceContentModal from "../components/CreateServiceContentModal";

const EditCustomers = () => {
  let { csid } = useParams();
  const [data, setData] = useState<ServiceDetailResponseDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [lock, setLock] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleGetCustomers = async (id: string) => {
      setLoading(true);
      try {
        const customers = await getServiceDetail(id);
        if (customers.status === "complete") setLock(true);
        setData(customers);
        setLoading(false);
      } catch (error: any) {
        enqueueSnackbar(error.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        setLoading(false);
      }
    };
    if (csid && !openModal) {
      handleGetCustomers(csid);
    }
  }, [openModal, csid]);

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  const handleUpdateFiled = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!data) return;
    let updateDate = {
      ...data,
      [name]: value,
    };
    setData(updateDate);
  };

  const handleUpdateDate = (value: any, name: string) => {
    if (!data) return;
    let updateDate = {
      ...data,
      [name]: new Date(value.$d).getTime(),
    };
    setData(updateDate);
  };

  const handleUpdateContent = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string | undefined
  ) => {
    if (!data || !id) return;
    const { name, value } = e.target;
    let updateDate = {
      ...data,
      customer_service_contents: data.customer_service_contents.map(
        (customer_service_content) => {
          if (customer_service_content.id === id) {
            return {
              ...customer_service_content,
              [name]: value,
            };
          } else {
            return customer_service_content;
          }
        }
      ),
    };
    setData(updateDate);
  };

  const handleUpdate = async () => {
    let customer_service_contents = data?.customer_service_contents.map(
      (customer_service_content) => {
        return {
          cscid: customer_service_content.id,
          ...customer_service_content,
        };
      }
    );

    let param = {
      csid,
      title: data?.title || "",
      status: data?.status || "",
      type: data?.type || "",
      notify_date: data?.notify_date || "",
      update_member: data?.update_member || "",
      customer_service_contents: JSON.stringify(customer_service_contents),
    };

    if (!data) return;
    setLoading(true);
    try {
      const res = await handleUpdateServiceDetail(param);
      enqueueSnackbar(res.message, {
        variant: res.status,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      setLoading(false);
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
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
      <Typography variant="h5">編輯客服紀錄</Typography>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <TextField
                label="客戶名稱"
                name="short_name"
                value={data?.short_name || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleUpdateFiled}
                disabled
              />
              <TextField
                label="客戶編號"
                name="customer_number"
                value={data?.customer_number || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleUpdateFiled}
                disabled
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <TextField
                label="客服紀錄狀態"
                name="status"
                value={data?.status}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleUpdateFiled}
                disabled={lock}
                select>
                <MenuItem value="not_started">未處理</MenuItem>
                <MenuItem value="in_progress">追蹤處理中</MenuItem>
                <MenuItem value="complete">結案（鎖單）</MenuItem>
              </TextField>
              <DatePicker
                format="YYYY/MM/DD"
                label="建立日期"
                value={dayjs(data?.create_date) || ""}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
                onChange={(newValue) =>
                  handleUpdateDate(newValue, "create_date")
                }
                disabled
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <TextField
                label="客服紀錄類型"
                name="type"
                value={data?.type || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleUpdateFiled}
                disabled={lock}
                select>
                <MenuItem value="報價需求">報價需求</MenuItem>
                <MenuItem value="合約內檢測報價">合約內檢測報價</MenuItem>
                <MenuItem value="議價">議價</MenuItem>
                <MenuItem value="其他">其他</MenuItem>
              </TextField>
              <DatePicker
                format="YYYY/MM/DD"
                label="下次提醒時間"
                value={dayjs(data?.notify_date) || ""}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
                disabled={lock}
                onChange={(newValue) =>
                  handleUpdateDate(newValue, "notify_date")
                }
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <TextField
                label="客服紀錄主旨"
                name="title"
                value={data?.title || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleUpdateFiled}
                disabled={lock}
              />
            </Box>
          </Box>
          {data?.customer_service_contents
            .sort((a: any, b: any) => b.create_date - a.create_date)
            .map((customer_service) => (
              <Box
                key={customer_service.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "1rem",
                  }}>
                  <TextField
                    label={`客服紀錄說明-${
                      customer_service.create_date
                        ? dayjs(customer_service.create_date).format("MM/DD")
                        : dayjs().format("MM/DD")
                    }`}
                    name="content"
                    value={customer_service.content}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    type="textarea"
                    multiline={true}
                    rows={4}
                    onChange={(e) =>
                      handleUpdateContent(e, customer_service.id)
                    }
                    disabled={lock}
                  />
                </Box>
              </Box>
            ))}
          <Box>
            <Button
              disabled={lock}
              startIcon={<AddIcon />}
              onClick={handleOpenModal}>
              新增客服紀錄說明
            </Button>
          </Box>
        </>
      )}
      <CreateServiceContentModal
        csid={csid}
        open={openModal}
        handleClose={handleCloseModal}
      />
      <Box
        sx={{
          position: "sticky",
          bottom: "1rem",
          right: "1rem",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}>
        <Button
          startIcon={<ArrowBackIosIcon />}
          variant="contained"
          onClick={() => navigate(-1)}>
          回到上一頁
        </Button>
        <Button
          startIcon={<UpdateIcon />}
          variant="contained"
          onClick={handleUpdate}
          disabled={lock}>
          儲存
        </Button>
      </Box>
    </Box>
  );
};

export default EditCustomers;
