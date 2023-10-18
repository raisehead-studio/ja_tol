import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { getWorks } from "../api/works";
import { getServices } from "../api/services";

import { ServiceResponseDataType } from "../types/services";

type DataType = {
  customer_number: string;
  name: string;
  id: string;
  date: string;
  title: string;
  type: string;
  status: string;
  last_update_member: string;
  last_update_date: string;
};

const Home = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let data: DataType[] = [];
    const services = async () => {
      try {
        const services = await getServices();
        setLoading(true);

        services.forEach((service: ServiceResponseDataType) => {
          data.push({
            customer_number: service.customer_number,
            name: service.short_name,
            id: service.id,
            date: service.notify_date,
            title: service.title,
            type: service.type,
            status: service.status,
            last_update_member: service.update_member,
            last_update_date: service.update_date,
          });
        });
      } catch (error) {
        return [];
      }
    };

    const works = async () => {
      try {
        const works = await getWorks();
        setLoading(true);

        works.forEach((work: any) => {
          data.push({
            customer_number: work.customer_number,
            name: work.customer_name,
            id: work.id,
            date: work.notify_date,
            title: work.work_order_name,
            type: work.type,
            status: work.status,
            last_update_member: work.update_member,
            last_update_date: work.update_date.split("T"),
          });
        });
        setData(data);
        setLoading(false);
      } catch (error) {
        return [];
      }
    };

    services();
    works();
  }, []);

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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead
              sx={{
                backgroundColor: "#f5f5f5",
              }}>
              <TableRow>
                <TableCell align="left">追蹤日期</TableCell>
                <TableCell align="left">客戶編號</TableCell>
                <TableCell align="left">客戶簡稱</TableCell>
                <TableCell align="left">工單編號/客服紀錄</TableCell>
                <TableCell align="left">追蹤項目/客服紀錄類型</TableCell>
                <TableCell align="left">追蹤事項說明/客服紀錄標題</TableCell>
                <TableCell align="left">最新編輯者</TableCell>
                <TableCell align="left">最新編輯時間</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((i: DataType) => (
                <TableRow
                  key={i.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {i.date}
                  </TableCell>
                  <TableCell align="left">{i.customer_number}</TableCell>
                  <TableCell align="left">{i.name}</TableCell>
                  <TableCell align="left">{i.status}</TableCell>
                  <TableCell align="left">{i.type}</TableCell>
                  <TableCell align="left">{i.title}</TableCell>
                  <TableCell align="left">{i.last_update_member}</TableCell>
                  <TableCell align="left">{i.last_update_date}</TableCell>
                  <TableCell align="left">
                    <Button onClick={() => {}}>檢視</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Home;
