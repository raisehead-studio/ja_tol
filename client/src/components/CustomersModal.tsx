import { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";

import { getCustomer } from "../api/customers";

import { CustomerResponseType } from "../types/customers";
import { TextField } from "@mui/material";

const ViewCustomers = ({
  cid,
  open,
  handleClose,
}: {
  cid: string;
  open: boolean;
  handleClose: () => void;
}) => {
  const [data, setData] = useState<CustomerResponseType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const handleGetCustomers = async (id: string) => {
      try {
        setLoading(true);
        const customers = await getCustomer(id);
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
    if (cid) {
      handleGetCustomers(cid);
    }
  }, [cid]);

  useEffect(() => {
    if (!open) {
      setData(null);
      setLoading(true);
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
          <Fragment>
            <Typography variant="h5">檢視顧客基本資料</Typography>
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
                  label="客戶編號"
                  name="customer_number"
                  value={""}
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
                <TextField
                  label="客戶名稱(經濟部公司登記)"
                  name="name"
                  value={data?.name || " - - "}
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
                    ".MuiInputBase-input": {
                      color: "#000 !important",
                      WebkitTextFillColor: "#000 !important",
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
                  label="客戶簡稱"
                  name="name"
                  value={data?.short_name || " - - "}
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
                    ".MuiInputBase-input": {
                      color: "#000 !important",
                      WebkitTextFillColor: "#000 !important",
                    },
                  }}
                  disabled
                />
                <TextField
                  label="統一編號"
                  name="tax_id"
                  value={data?.tax_id || " - - "}
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
                    ".MuiInputBase-input": {
                      color: "#000 !important",
                      WebkitTextFillColor: "#000 !important",
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
                  label="電號"
                  name="ele_number"
                  value={data?.ele_number || " - - "}
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
                    ".MuiInputBase-input": {
                      color: "#000 !important",
                      WebkitTextFillColor: "#000 !important",
                    },
                    width: "50%",
                  }}
                  disabled
                />
              </Box>
            </Box>
            <Divider />
            <Typography variant="h5">用電場所</Typography>
            <Box
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
                  label="用電場所全名"
                  name="customer_number"
                  value={data?.ele_place_name || " - - "}
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
                    ".MuiInputBase-input": {
                      color: "#000 !important",
                      WebkitTextFillColor: "#000 !important",
                    },
                  }}
                  disabled
                />
                <TextField
                  label="用電場所負責人"
                  name="ele_place_owner"
                  value={data?.ele_place_owner || " - - "}
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
                    ".MuiInputBase-input": {
                      color: "#000 !important",
                      WebkitTextFillColor: "#000 !important",
                    },
                  }}
                  disabled
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                }}>
                <TextField
                  label="電器技術人員登記執照編號"
                  name="registration_member_number"
                  value={data?.registration_member_number || " - - "}
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
                    ".MuiInputBase-input": {
                      color: "#000 !important",
                      WebkitTextFillColor: "#000 !important",
                    },
                  }}
                  disabled
                />
                <TextField
                  label="專任電器技術人員"
                  name="ele_engineer"
                  value={data?.ele_engineer || " - - "}
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
                    ".MuiInputBase-input": {
                      color: "#000 !important",
                      WebkitTextFillColor: "#000 !important",
                    },
                  }}
                  disabled
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                }}>
                <TextField
                  label="台電單位"
                  name="taiwan_power_company"
                  value={data?.taiwan_power_company || " - - "}
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
                    ".MuiInputBase-input": {
                      color: "#000 !important",
                      WebkitTextFillColor: "#000 !important",
                    },
                  }}
                  disabled
                />
                <TextField
                  label="政府單位"
                  name="government"
                  value={data?.government || " - - "}
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
                    ".MuiInputBase-input": {
                      color: "#000 !important",
                      WebkitTextFillColor: "#000 !important",
                    },
                  }}
                  disabled
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                }}>
                <TextField
                  label="用電場所地址"
                  name="ele_place_address"
                  value={data?.ele_place_address || " - - "}
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
                    ".MuiInputBase-input": {
                      color: "#000 !important",
                      WebkitTextFillColor: "#000 !important",
                    },
                  }}
                  disabled
                />
                <TextField
                  label="檢測"
                  name="test"
                  value={data?.test || " - - "}
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
                    ".MuiInputBase-input": {
                      color: "#000 !important",
                      WebkitTextFillColor: "#000 !important",
                    },
                  }}
                  disabled
                />
              </Box>
            </Box>

            <Divider />
            <Typography variant="h5">備註</Typography>
            <TextField
              label={`入廠說明`}
              name="factory_description"
              value={data?.factory_description || " - - "}
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
                ".MuiInputBase-input": {
                  color: "#000 !important",
                  WebkitTextFillColor: "#000 !important",
                },
              }}
              disabled
            />
            <TextField
              label={`驗收說明`}
              name="acceptance_check_description"
              value={data?.acceptance_check_description || " - - "}
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
                ".MuiInputBase-input": {
                  color: "#000 !important",
                  WebkitTextFillColor: "#000 !important",
                },
              }}
              disabled
            />
            <TextField
              label={`請款說明`}
              name="tobill_description"
              value={data?.tobill_description || " - - "}
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
                ".MuiInputBase-input": {
                  color: "#000 !important",
                  WebkitTextFillColor: "#000 !important",
                },
              }}
              disabled
            />
            <TextField
              label={`報價說明`}
              name="invoice_description"
              value={data?.invoice_description || " - - "}
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
                ".MuiInputBase-input": {
                  color: "#000 !important",
                  WebkitTextFillColor: "#000 !important",
                },
              }}
              disabled
            />
            <TextField
              label={`其他說明`}
              name="other_description"
              value={data?.other_description || " - - "}
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
                ".MuiInputBase-input": {
                  color: "#000 !important",
                  WebkitTextFillColor: "#000 !important",
                },
              }}
              disabled
            />
            <Divider />
            <Typography variant="h5">客戶聯絡人</Typography>
            {data?.customer_contacts.map((contact, index) => (
              <Box
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
                    label="聯絡窗口類型"
                    name="type"
                    value={contact.type}
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
                      ".MuiInputBase-input": {
                        color: "#000 !important",
                        WebkitTextFillColor: "#000 !important",
                      },
                    }}
                    disabled
                  />
                  <TextField
                    label={`聯絡人-${index + 1}`}
                    name="name"
                    value={contact.name}
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
                      ".MuiInputBase-input": {
                        color: "#000 !important",
                        WebkitTextFillColor: "#000 !important",
                      },
                    }}
                    disabled
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "1rem",
                  }}>
                  <TextField
                    label="職務內容"
                    name="job_description"
                    value={contact.job_description}
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
                      ".MuiInputBase-input": {
                        color: "#000 !important",
                        WebkitTextFillColor: "#000 !important",
                      },
                    }}
                    disabled
                  />
                  <TextField
                    label={`聯絡電話`}
                    name="phone"
                    value={contact.phone}
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
                      ".MuiInputBase-input": {
                        color: "#000 !important",
                        WebkitTextFillColor: "#000 !important",
                      },
                    }}
                    disabled
                  />
                </Box>
                <Box>
                  <TextField
                    label={`聯絡人備註`}
                    name="note"
                    value={contact.note}
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
                      ".MuiInputBase-input": {
                        color: "#000 !important",
                        WebkitTextFillColor: "#000 !important",
                      },
                    }}
                    disabled
                  />
                </Box>
                <Divider />
              </Box>
            ))}
            <Divider />
            {data?.customer_services.map((service, index) => (
              <Box key={service.id}>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                    }}>
                    客服紀錄-{index + 1}：
                  </Typography>
                </Box>
                <Button
                  sx={{
                    px: "0px",
                  }}>
                  {service.title} || 提醒日期：
                  {dayjs(service.notify_date).format("YYYY/MM/DD")}
                </Button>
              </Box>
            ))}
            <Divider />
            <Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}>
                取消
              </Button>
              {/* <Button>儲存</Button> */}
            </Box>
          </Fragment>
        )}
      </Box>
    </Modal>
  );
};

export default ViewCustomers;
