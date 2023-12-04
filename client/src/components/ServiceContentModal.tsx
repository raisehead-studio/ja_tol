import { useEffect, useState, ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";

import { ServiceDetailResponseDataType } from "../types/services";
import { getServiceDetail } from "../api/services";
import CreateServiceContentModal from "./CreateServiceContentModal";

const ViewServiceContent = ({
  csid,
  open,
  handleClose,
}: {
  csid: string;
  open: boolean;
  handleClose: () => void;
}) => {
  const [data, setData] = useState<ServiceDetailResponseDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const handleGetCustomers = async (id: string) => {
      setLoading(true);
      try {
        const customers = await getServiceDetail(id);
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

  // const handleOpenModal = () => setOpenModal(true);

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

  useEffect(() => {
    if (!open) {
      setData(null);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "50px",
          gap: "1rem",
          backgroundColor: "#fff",
          width: "80vw",
          maxHeight: "80vh",
          overflowY: "scroll",
          borderRadius: "1rem",
          transform: "translate(calc(10vw - 50px), 5vh)",
        }}>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
              gap: "1rem",
            }}>
            <Typography variant="h5">檢視客服紀錄</Typography>
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
                      sx={{
                        ".MuiInputLabel-root": {
                          color: "rgba(0,0,0,9)",
                        },
                        fieldset: {
                          borderColor: "rgba(0,0,0,0) !important",
                        },
                      }}
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
                      sx={{
                        ".MuiInputLabel-root": {
                          color: "rgba(0,0,0,9)",
                        },
                        fieldset: {
                          borderColor: "rgba(0,0,0,0) !important",
                        },
                      }}
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
                      value={data?.status || ""}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      onChange={handleUpdateFiled}
                      sx={{
                        ".MuiInputLabel-root": {
                          color: "rgba(0,0,0,9)",
                        },
                        fieldset: {
                          borderColor: "rgba(0,0,0,0) !important",
                        },
                      }}
                      disabled
                    />
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
                      sx={{
                        ".MuiInputLabel-root": {
                          color: "rgba(0,0,0,9)",
                        },
                        fieldset: {
                          borderColor: "rgba(0,0,0,0) !important",
                        },
                      }}
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
                      name="name"
                      value={data?.type || ""}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      sx={{
                        ".MuiInputLabel-root": {
                          color: "rgba(0,0,0,9)",
                        },
                        fieldset: {
                          borderColor: "rgba(0,0,0,0) !important",
                        },
                      }}
                      disabled
                    />
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
                      onChange={(newValue) =>
                        handleUpdateDate(newValue, "notify_date")
                      }
                      sx={{
                        ".MuiInputLabel-root": {
                          color: "rgba(0,0,0,9)",
                        },
                        fieldset: {
                          borderColor: "rgba(0,0,0,0) !important",
                        },
                      }}
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
                      label="客服紀錄標題"
                      name="name"
                      value={data?.title || ""}
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      sx={{
                        ".MuiInputLabel-root": {
                          color: "rgba(0,0,0,9)",
                        },
                        fieldset: {
                          borderColor: "rgba(0,0,0,0) !important",
                        },
                      }}
                      disabled
                    />
                  </Box>
                </Box>
                {data?.customer_service_contents.map(
                  (customer_service, index) => (
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
                          label={`客服紀錄內容-${
                            customer_service.create_date
                              ? dayjs(customer_service.create_date).format(
                                  "MM/DD"
                                )
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
                          sx={{
                            ".MuiInputLabel-root": {
                              color: "rgba(0,0,0,9)",
                            },
                            fieldset: {
                              borderColor: "rgba(0,0,0,0) !important",
                            },
                          }}
                          disabled
                        />
                      </Box>
                    </Box>
                  )
                )}
              </>
            )}
            <CreateServiceContentModal
              csid={csid}
              open={openModal}
              handleClose={handleCloseModal}
            />
            <Box>
              <Button
                color="secondary"
                variant="contained"
                onClick={handleClose}>
                取消{" "}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default ViewServiceContent;
