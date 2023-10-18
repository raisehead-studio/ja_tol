import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import { getCustomer } from "../api/customers";

import { CustomerResponseType } from "../types/customers";
import { TextField } from "@mui/material";

const EditCustomers = ({
  cid,
  open,
  handleClose,
}: {
  cid: string;
  open: boolean;
  handleClose: () => void;
}) => {
  const [data, setData] = useState<CustomerResponseType | null>(null);
  useEffect(() => {
    const handleGetCustomers = async (id: string) => {
      try {
        const customers = await getCustomer(id);
        setData(customers);
      } catch (error) {
        console.log(error);
      }
    };
    if (cid) {
      handleGetCustomers(cid);
    }
  }, [cid]);

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
              label="客戶統編"
              name="customer_number"
              value={""}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
                fieldset: {
                  borderColor: "rgba(0,0,0,0) !important",
                },
              }}
              disabled
            />
            <TextField
              label="客戶名稱"
              name="name"
              value={data?.name || ""}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
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
              value={data?.short_name || ""}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
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
              label="客戶編號"
              name="customer_number"
              value={data?.customer_number || ""}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
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
              value={data?.ele_place_name || ""}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
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
              value={data?.ele_place_owner || ""}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
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
              label="用電場所地址"
              name="ele_place_address"
              value={data?.ele_place_address || ""}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
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
        <Box>
          <Button>新增聯絡人</Button>
        </Box>
        <Divider />
        <Typography variant="h5">備註</Typography>
        <TextField
          label={`聯絡人備註`}
          name="factory_description"
          value={data?.factory_description || ""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{
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
          label={`聯絡人備註`}
          name="factory_description"
          value={data?.factory_description || ""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{
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
          label={`聯絡人備註`}
          name="factory_description"
          value={data?.factory_description || ""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{
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
          label={`聯絡人備註`}
          name="factory_description"
          value={data?.factory_description || ""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{
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
        {data?.customer_services.map((service, index) => (
          <Box>
            <Button>
              客服紀錄-{index + 1}：{service.title} || 提醒日期：
              {service.notify_date}
            </Button>
          </Box>
        ))}
        <Box>
          <Button>新增客服紀錄</Button>
        </Box>
        <Divider />
        <Box>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            取消
          </Button>
          {/* <Button>儲存</Button> */}
        </Box>
      </Box>
    </Modal>
  );
};

export default EditCustomers;
