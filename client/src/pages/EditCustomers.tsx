import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { getCustomer } from "../api/customers";

import { CustomerResponseType } from "../types/customers";
import { TextField } from "@mui/material";

import CreateService from "../components/CreateServiceModal";

const EditCustomers = () => {
  let { cid } = useParams();
  const [data, setData] = useState<CustomerResponseType | null>(null);
  const [openCreateService, setOpenCreateService] = useState<boolean>(false);

  const handleOpenCreateService = () => {
    setOpenCreateService(true);
  };

  const handleCloseCreateService = () => {
    setOpenCreateService(false);
  };

  const navigate = useNavigate();
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        gap: "1rem",
      }}>
      <Typography variant="h5">編輯顧客基本資料</Typography>
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
            label="客戶桶編"
            name="customer_number"
            value={""}
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="客戶名稱"
            name="name"
            value={data?.name || ""}
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
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
          />
          <TextField
            label="客戶編號"
            name="customer_number"
            value={data?.customer_number || ""}
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
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
          />
          <TextField
            label="用電場所負責人"
            name="ele_place_owner"
            value={data?.ele_place_owner || ""}
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
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
            />
            <TextField
              label={`聯絡人-${index + 1}`}
              name="name"
              value={contact.name}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
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
            />
            <TextField
              label={`聯絡電話`}
              name="phone"
              value={contact.phone}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
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
      />
      <TextField
        label={`聯絡人備註`}
        name="factory_description"
        value={data?.factory_description || ""}
        size="small"
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
      <TextField
        label={`聯絡人備註`}
        name="factory_description"
        value={data?.factory_description || ""}
        size="small"
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
      <TextField
        label={`聯絡人備註`}
        name="factory_description"
        value={data?.factory_description || ""}
        size="small"
        InputLabelProps={{ shrink: true }}
        fullWidth
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
        <Button onClick={handleOpenCreateService}>新增客服紀錄</Button>
      </Box>
      <Divider />
      <Box>
        <Button onClick={() => navigate(-1)}>回到上一頁</Button>
        <Button>儲存</Button>
      </Box>
      <CreateService
        selectedCid={cid}
        open={openCreateService}
        handleClose={handleCloseCreateService}
      />
    </Box>
  );
};

export default EditCustomers;
