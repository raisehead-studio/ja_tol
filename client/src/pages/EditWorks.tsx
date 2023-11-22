import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

import {
  getWorksDetailAssignment,
  getWorksDetailAcceptanceCheck,
  getWorksDetailFactory,
  getWorksDetailTobill,
} from "../api/works";

import { AssignmentResponseDataType } from "../types/works";

import CreateService from "../components/CreateServiceModal";

const EditWorks = () => {
  let { woid } = useParams();
  const [data, setData] = useState<{} | null>(null);
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {}, [woid]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
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
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Typography variant="h5">編輯工單資料</Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab label="派工" />
            <Tab label="入廠" />
            <Tab label="驗收" />
            <Tab label="請款" />
          </Tabs>
        </Box>
      </Box>
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
            value={""}
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="工單編號"
            name="name"
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="工程名稱"
            name="name"
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
            label="工單類型"
            name="name"
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="採購PO (複選)"
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
            label="派工作業完成日期"
            name="name"
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="入廠作業完成日期"
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="請款作業完成日期"
            name="name"
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="驗收作業完成日期"
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Box>
      </Box>
      <Divider />
      <EditWorksAssignments tab={tab} woid={woid} />
      <EditWorksAcceptanceCheck tab={tab} woid={woid} />
      <EditWorksFactory tab={tab} woid={woid} />
      <EditWorksTobill tab={tab} woid={woid} />
      <Divider />
      <Box>
        <Button onClick={() => navigate(-1)}>回到上一頁</Button>
        <Button>儲存</Button>
      </Box>
    </Box>
  );
};

const EditWorksAssignments = ({
  tab,
  woid,
}: {
  tab: number;
  woid: string | undefined;
}) => {
  const [data, setData] = useState<AssignmentResponseDataType | null>(null);

  useEffect(() => {
    const handleGetAssignmentDetail = async (id: string) => {
      try {
        const assignments = await getWorksDetailAssignment(id);
        setData(assignments);
      } catch (error) {
        console.log(error);
      }
    };
    if (woid) {
      handleGetAssignmentDetail(woid);
    }
  }, [woid]);

  console.log(data);

  if (tab !== 0) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}>
      <Typography variant="h5">施工地址及材料準備</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "stretch",
          gap: "1rem",
        }}>
        <TextField
          label="施工地址"
          value={""}
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
          label="材料準備狀況"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="材料備妥日期"
          name="name"
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Box>
      <Divider />
      <Typography variant="h5">施工時間及人力安排</Typography>
      {data &&
        data.manpower_schedule.map((manpower) => (
          <Box
            key={manpower.id}
            sx={{
              display: "flex",
              justifyContent: "stretch",
              gap: "1rem",
            }}>
            <TextField
              label="預計排程日期"
              value={manpower?.schedule_date}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="時間"
              name="name"
              size="small"
              value={manpower?.started_time}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="實際施工日期"
              name="name"
              size="small"
              value={manpower?.actual_date}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              label="備註"
              name="name"
              size="small"
              value={manpower?.note}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
        ))}
      <FormGroup>
        <FormControlLabel
          control={<Checkbox size="small" />}
          label="人力安排已完成"
        />
      </FormGroup>
      <Divider />
      <Typography variant="h5">停電狀況</Typography>
      {[1, 2, 3].map((manpower) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "stretch",
            gap: "1rem",
          }}>
          <TextField
            label="停電區域"
            name="name"
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="時段"
            name="name"
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Box>
      ))}
      <Divider />
      <Typography variant="h5">外部聯絡單</Typography>
      <FormGroup
        sx={{
          flexDirection: "row",
        }}>
        <FormControlLabel control={<Checkbox size="small" />} label="假日" />
        <FormControlLabel control={<Checkbox size="small" />} label="停電" />
      </FormGroup>
      <Box
        sx={{
          display: "flex",
          justifyContent: "stretch",
          gap: "1rem",
        }}>
        <TextField
          label="發送日"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="回傳日"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Box>
      <Divider />
      <Typography variant="h5">派工-追蹤事項</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "stretch",
          gap: "1rem",
        }}>
        <TextField
          label="派工-追蹤日期"
          value={""}
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
          label="追蹤事項說明"
          value={""}
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
          label="派工作業完成與否"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="派工作業完成日期"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Box>
    </Box>
  );
};

const EditWorksFactory = ({
  tab,
  woid,
}: {
  tab: number;
  woid: string | undefined;
}) => {
  if (tab !== 1) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        gap: "1rem",
      }}>
      <Typography variant="h5">入廠說明</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "stretch",
          gap: "1rem",
        }}>
        <TextField
          label="入廠說明"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          multiline
          rows={4}
        />
      </Box>
      <Typography variant="h5">其他表格</Typography>
      {[1, 2, 3].map((manpower) => (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "stretch",
              gap: "1rem",
            }}>
            <TextField
              label="當天上課"
              value={""}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              select>
              <MenuItem value={0}>是</MenuItem>
              <MenuItem value={1}>否</MenuItem>
            </TextField>
            <TextField
              label="團險證明"
              value={""}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              select>
              <MenuItem value={0}>是</MenuItem>
              <MenuItem value={1}>否</MenuItem>
            </TextField>
            <TextField
              label="勞保證明"
              value={""}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              select>
              <MenuItem value={0}>是</MenuItem>
              <MenuItem value={1}>否</MenuItem>
            </TextField>
            <TextField
              label="無塵鞋套"
              value={""}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              select>
              <MenuItem value={0}>是</MenuItem>
              <MenuItem value={1}>否</MenuItem>
            </TextField>
            <TextField
              label="無塵服"
              value={""}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
              select>
              <MenuItem value={0}>是</MenuItem>
              <MenuItem value={1}>否</MenuItem>
            </TextField>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "stretch",
              gap: "1rem",
            }}>
            <TextField
              label="其他表格"
              value={""}
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
        </>
      ))}
      <Button startIcon={<AddIcon />}>新增其他表格</Button>
      <Divider />
      <Typography variant="h5">入廠-追蹤事項</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "stretch",
          gap: "1rem",
        }}>
        <TextField
          label="入廠-追蹤日期"
          value={""}
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
          label="入廠-追蹤事項說明"
          value={""}
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
          label="入廠作業完成與否"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="入廠作業完成日期"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Box>
    </Box>
  );
};

const EditWorksAcceptanceCheck = ({
  tab,
  woid,
}: {
  tab: number;
  woid: string | undefined;
}) => {
  if (tab !== 2) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        gap: "1rem",
      }}>
      <Typography variant="h5">驗收說明</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "stretch",
          gap: "1rem",
        }}>
        <TextField
          label="驗收說明"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          multiline
          rows={4}
        />
      </Box>
      <Divider />
      <Typography variant="h5">驗收照片儲存</Typography>
      <FormGroup
        sx={{
          flexDirection: "row",
        }}>
        <FormControlLabel control={<Checkbox size="small" />} label="施工前" />
        <FormControlLabel control={<Checkbox size="small" />} label="施工中" />
        <FormControlLabel control={<Checkbox size="small" />} label="施工後" />
      </FormGroup>
      <Divider />
      <Typography variant="h5">停電/活電檢驗</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "stretch",
          gap: "1rem",
        }}>
        <TextField
          label="4-1完成日期"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="4-2完成日期"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="4-3完成日期"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="4-4完成日期"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="缺失同意書"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "stretch",
          gap: "1rem",
        }}>
        <TextField
          label="申報-良好 / 不良"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="登入EW60"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="一七申報(縣市政府)郵寄日期"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="一七申報(台電)郵寄日期"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="保固書"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          select>
          <MenuItem value={0}>有</MenuItem>
          <MenuItem value={1}>無</MenuItem>
        </TextField>
      </Box>
      <Divider />
      <Typography variant="h5">驗收-追蹤事項</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "stretch",
          gap: "1rem",
        }}>
        <TextField
          label="驗收-追蹤日期"
          value={""}
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
          label="驗收-追蹤事項說明"
          value={""}
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
          label="驗收作業完成與否"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="驗收作業完成日期"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Box>
    </Box>
  );
};

const EditWorksTobill = ({
  tab,
  woid,
}: {
  tab: number;
  woid: string | undefined;
}) => {
  if (tab !== 3) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        gap: "1rem",
      }}>
      <Typography variant="h5">驗收說明</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "stretch",
          gap: "1rem",
        }}>
        <TextField
          label="驗收說明"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          multiline
          rows={4}
        />
      </Box>
      <Divider />
      <Typography variant="h5">發票記錄</Typography>
      {[1, 2, 3].map((manpower) => (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "stretch",
              gap: "1rem",
            }}>
            <TextField
              label="合約總額%數"
              name="name"
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="發票日期"
              name="name"
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="金額(未稅)"
              name="name"
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="發票號碼"
              name="name"
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="郵寄備註"
              name="name"
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
              label="郵寄日期"
              name="name"
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="發票"
              name="name"
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="回郵信封"
              name="name"
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="報告書"
              name="name"
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="檢驗總表"
              name="name"
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="檢驗不良同意書"
              name="name"
              size="small"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
        </>
      ))}
      <Typography variant="h5">請款-追蹤事項</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "stretch",
          gap: "1rem",
        }}>
        <TextField
          label="請款-追蹤日期"
          value={""}
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
          label="請款-追蹤事項說明"
          value={""}
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
          label="請款作業完成與否"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="請款作業完成日期"
          value={""}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default EditWorks;
