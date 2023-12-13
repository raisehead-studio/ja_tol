import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";

import {
  getWorksDetail,
  getWorksDetailAssignment,
  getWorksDetailAcceptanceCheck,
  getWorksDetailFactory,
  getWorksDetailTobill,
} from "../api/works";

import {
  AssignmentResponseDataType,
  FactoryDataType,
  AcceptanceCheckDataType,
  TobillDataType,
  TobillInvoiceDataType,
  WorkOrderDetailResponseDataType,
} from "../types/works";

const WorksModal = ({
  woid,
  open,
  handleClose,
}: {
  woid?: string;
  open: boolean;
  handleClose: () => void;
}) => {
  const [data, setData] = useState<WorkOrderDetailResponseDataType | null>(
    null
  );
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleUpdateDate = (value: any, name: string) => {
    if (!data) return;
    let updateDate = {
      ...data,
      [name]: new Date(value.$d).getTime(),
    };
    setData(updateDate);
  };

  useEffect(() => {
    const handleGetWorks = async (woid: string) => {
      setLoading(true);

      try {
        const work = await getWorksDetail(woid);
        setData(work);
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
    if (woid) {
      handleGetWorks(woid);
    }
  }, [woid]);

  useEffect(() => {
    if (!open) {
      setData(null);
      setTab(0);
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
            <Typography variant="h5">檢視工單資料</Typography>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={tab} onChange={handleTabChange}>
                <Tab label="派工" />
                <Tab label="入廠" />
                <Tab label="驗收" />
                <Tab label="請款" />
              </Tabs>
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
                    value={data?.name || ""}
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    disabled
                  />
                  <TextField
                    label="工單編號"
                    name="name"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={data?.order_number || ""}
                    disabled
                  />
                  <TextField
                    label="工程名稱"
                    name="name"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={data?.order_number || ""}
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
                    label="工單種類"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    name="type"
                    value={data?.type || ""}
                    select>
                    <MenuItem value="電力">電力</MenuItem>
                    <MenuItem value="紅外線">紅外線</MenuItem>
                    <MenuItem value="工程">工程</MenuItem>
                    <MenuItem value="維修">維修</MenuItem>
                    <MenuItem value="竣工">竣工</MenuItem>
                    <MenuItem value="加油站檢測">加油站檢測</MenuItem>
                    <MenuItem value="接地檢測">接地檢測</MenuItem>
                    <MenuItem value="能源管理">能源管理</MenuItem>
                    <MenuItem value="營造開發">營造開發</MenuItem>
                    <MenuItem value="其它">其它</MenuItem>
                  </TextField>
                  <TextField
                    label="採購PO (複選)"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={data?.po || ""}
                    name="po"
                  />
                  <TextField
                    label="成交金額(未稅)"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    value={data?.price || ""}
                    name="price"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "stretch",
                    gap: "1rem",
                  }}>
                  <DatePicker
                    format="YYYY/MM/DD"
                    label="派工作業完成日期"
                    value={dayjs(data?.assignment_date) || ""}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                      },
                    }}
                    onChange={(newValue) =>
                      handleUpdateDate(newValue, "assignment_date")
                    }
                  />
                  <DatePicker
                    format="YYYY/MM/DD"
                    label="驗收作業完成日期"
                    value={dayjs(data?.acceptance_check_date) || ""}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                      },
                    }}
                    onChange={(newValue) =>
                      handleUpdateDate(newValue, "acceptance_check_date")
                    }
                  />
                  <DatePicker
                    format="YYYY/MM/DD"
                    label="請款作業完成日期"
                    value={dayjs(data?.tobill_date) || ""}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                      },
                    }}
                    onChange={(newValue) =>
                      handleUpdateDate(newValue, "tobill_date")
                    }
                  />
                  <DatePicker
                    format="YYYY/MM/DD"
                    label="入廠作業完成日期"
                    value={dayjs(data?.factory_date) || ""}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                      },
                    }}
                    onChange={(newValue) =>
                      handleUpdateDate(newValue, "factory_date")
                    }
                  />
                </Box>
              </Box>
              <Divider />
              <EditWorksAssignments tab={tab} woid={woid} />
              <EditWorksAcceptanceCheck tab={tab} woid={woid} />
              <EditWorksFactory tab={tab} woid={woid} />
              <EditWorksTobill tab={tab} woid={woid} />
              <Divider />
              <Box
                sx={{
                  position: "sticky",
                  bottom: "1rem",
                  right: "1rem",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}>
                <Button
                  startIcon={<ArrowBackIosIcon />}
                  variant="contained"
                  onClick={handleClose}>
                  取消
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Modal>
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
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={data?.manufacturing_address || ""}
          name="manufacturing_address"
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
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={data?.manufacturing_status || ""}
          name="manufacturing_status"
        />
        <DatePicker
          format="YYYY/MM/DD"
          label="材料備妥日期"
          value={dayjs(data?.manufacturing_date) || ""}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
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
            <DateTimePicker
              label="預計排程開始時間"
              value={dayjs(manpower?.started_time) || ""}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                },
              }}
            />
            <DateTimePicker
              label="預計排程結束時間"
              value={dayjs(manpower?.finished_time) || ""}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                },
              }}
            />
            <DatePicker
              format="YYYY/MM/DD"
              label="實際施工日期"
              value={dayjs(manpower?.actual_date) || ""}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                },
              }}
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
          control={
            <Checkbox
              size="small"
              checked={data?.is_assign_manpower || false}
              name="is_assign_manpower"
            />
          }
          label="人力安排已完成"
        />
      </FormGroup>
      <Divider />
      <Typography variant="h5">停電狀況</Typography>
      {data &&
        data.power_stop.map((stop) => (
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
              value={stop?.area || ""}
            />
            <DateTimePicker
              label="停電開始時間"
              value={dayjs(stop?.started_date) || ""}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                },
              }}
            />
            <DateTimePicker
              label="停電結束時間"
              value={dayjs(stop?.finished_date) || ""}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: "small",
                },
              }}
            />
          </Box>
        ))}
      <Divider />
      <Typography variant="h5">外部聯絡單</Typography>
      <FormGroup
        sx={{
          flexDirection: "row",
        }}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={data?.external_contact_is_holiday || false}
              name="external_contact_is_holiday"
            />
          }
          label="假日"
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={data?.external_contact_is_power_stop || false}
              name="external_contact_is_power_stop"
            />
          }
          label="停電"
        />
      </FormGroup>
      <Box
        sx={{
          display: "flex",
          justifyContent: "stretch",
          gap: "1rem",
        }}>
        <DatePicker
          format="YYYY/MM/DD"
          label="發送日"
          value={dayjs(data?.external_contact_request_date) || ""}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
        />
        <DatePicker
          format="YYYY/MM/DD"
          label="回傳日"
          value={dayjs(data?.external_contact_receive_date) || ""}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
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
        <DatePicker
          format="YYYY/MM/DD"
          label="派工-追蹤日期"
          value={dayjs(data?.tracking_date) || ""}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
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
          value={data?.tracking_description || false}
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
        <FormControlLabel
          sx={{
            width: "30vw",
          }}
          control={
            <Checkbox
              size="small"
              checked={data?.tracking_is_finished || false}
              name="tracking_is_finished"
            />
          }
          label="派工作業完成與否"
        />
        <DatePicker
          format="YYYY/MM/DD"
          label="派工作業完成日期"
          value={dayjs(data?.tracking_finished_date) || ""}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
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
  const [data, setData] = useState<FactoryDataType | null>(null);

  useEffect(() => {
    const handleGetFactoryDetail = async (id: string) => {
      try {
        const factory = await getWorksDetailFactory(id);
        setData(factory);
      } catch (error) {
        console.log(error);
      }
    };
    if (woid) {
      handleGetFactoryDetail(woid);
    }
  }, [woid]);

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
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          multiline
          rows={4}
          value={data?.description || ""}
          name="description"
        />
      </Box>
      <Typography variant="h5">其他表格</Typography>
      {data &&
        data.factory_other_form.map((form) => (
          <>
            <Box
              key={form.id}
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <TextField
                label="當天上課"
                size="small"
                name={"is_class"}
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={form?.is_class ? 0 : 1}
                select>
                <MenuItem value={0}>是</MenuItem>
                <MenuItem value={1}>否</MenuItem>
              </TextField>
              <TextField
                label="團險證明"
                size="small"
                value={form?.is_group_insurance ? 0 : 1}
                InputLabelProps={{ shrink: true }}
                fullWidth
                select
                name="is_group_insurance">
                <MenuItem value={0}>是</MenuItem>
                <MenuItem value={1}>否</MenuItem>
              </TextField>
              <TextField
                label="勞保證明"
                value={form?.is_label_insurance ? 0 : 1}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                select
                name="is_label_insurance">
                <MenuItem value={0}>是</MenuItem>
                <MenuItem value={1}>否</MenuItem>
              </TextField>
              <TextField
                label="無塵鞋套"
                value={form?.is_bunny_shoe ? 0 : 1}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                select
                name="is_bunny_shoe">
                <MenuItem value={0}>是</MenuItem>
                <MenuItem value={1}>否</MenuItem>
              </TextField>
              <TextField
                label="無塵服"
                value={form?.is_bunny_suit ? 0 : 1}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                select
                name="is_bunny_suit">
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
                value={form?.other_form || ""}
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                name="other_form"
              />
            </Box>
          </>
        ))}

      <Divider />
      <Typography variant="h5">入廠-追蹤事項</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "stretch",
          gap: "1rem",
        }}>
        <DatePicker
          format="YYYY/MM/DD"
          label="入廠-追蹤日期"
          value={dayjs(data?.tracking_date) || ""}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
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
          value={data?.tracking_description}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          name="tracking_description"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "stretch",
          gap: "1rem",
        }}>
        <FormControlLabel
          sx={{
            width: "30vw",
          }}
          control={
            <Checkbox
              size="small"
              checked={data?.tracking_is_finished || false}
              name="tracking_is_finished"
            />
          }
          label="入廠作業完成與否"
        />
        <DatePicker
          format="YYYY/MM/DD"
          label="入廠作業完成日期"
          value={dayjs(data?.tracking_date) || ""}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
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
  const [data, setData] = useState<AcceptanceCheckDataType | null>(null);

  useEffect(() => {
    const handleGetFactoryDetail = async (id: string) => {
      try {
        const factory = await getWorksDetailAcceptanceCheck(id);
        setData(factory);
      } catch (error) {
        console.log(error);
      }
    };
    if (woid) {
      handleGetFactoryDetail(woid);
    }
  }, [woid]);

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
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          multiline
          rows={4}
          value={data?.description || ""}
          name="description"
        />
      </Box>
      <Divider />
      <Typography variant="h5">驗收照片儲存</Typography>
      <FormGroup
        sx={{
          flexDirection: "row",
        }}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={data?.is_photo_before || false}
              name="is_photo_before"
            />
          }
          label="施工前"
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={data?.is_photo_during || false}
              name="is_photo_during"
            />
          }
          label="施工中"
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={data?.is_photo_after || false}
              name="is_photo_after"
            />
          }
          label="施工後"
        />
      </FormGroup>
      <Divider />
      <Typography variant="h5">停電/活電檢驗</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "stretch",
          gap: "1rem",
        }}>
        <DatePicker
          format="YYYY/MM/DD"
          label="4-1完成日期"
          value={dayjs(data?.power_switch_date1) || ""}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
        />
        <DatePicker
          format="YYYY/MM/DD"
          label="4-2完成日期"
          value={dayjs(data?.power_switch_date2) || ""}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
        />
        <DatePicker
          format="YYYY/MM/DD"
          label="4-3完成日期"
          value={dayjs(data?.power_switch_date3) || ""}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
        />
        <DatePicker
          format="YYYY/MM/DD"
          label="4-4完成日期"
          value={dayjs(data?.power_switch_date4) || ""}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
        />
        <TextField
          label="缺失同意書"
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={data?.defect_agreement || ""}
          name="defect_agreement"
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
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={data?.report_type || ""}
          name="report_type"
        />
        <TextField
          label="登入EW60"
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={data?.ew06_registration || ""}
          name="ew06_registration"
        />
        <DatePicker
          format="YYYY/MM/DD"
          label="一七申報(縣市政府)郵寄日期"
          value={dayjs(data?.fom17_registration_government_date) || ""}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
        />
        <TextField
          label="一七申報(台電)郵寄日期"
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={data?.report_type || ""}
          name="report_type"
        />
        <TextField
          label="保固書"
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={data?.is_warranty ? 0 : 1}
          name="is_warranty"
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
        <DatePicker
          format="YYYY/MM/DD"
          label="驗收-追蹤日期"
          value={dayjs(data?.tracking_date) || ""}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
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
          value={data?.tracking_description}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          name="tracking_description"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "stretch",
          gap: "1rem",
        }}>
        <FormControlLabel
          sx={{
            width: "30vw",
          }}
          control={
            <Checkbox
              size="small"
              checked={data?.tracking_is_finished || false}
              name="tracking_is_finished"
            />
          }
          label="驗收作業完成與否"
        />
        <DatePicker
          format="YYYY/MM/DD"
          label="驗收作業完成日期"
          value={dayjs(data?.tracking_date) || ""}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
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
  const [data, setData] = useState<TobillDataType | null>(null);

  useEffect(() => {
    const handleGetFactoryDetail = async (id: string) => {
      try {
        const factory = await getWorksDetailTobill(id);
        setData(factory);
      } catch (error) {
        console.log(error);
      }
    };
    if (woid) {
      handleGetFactoryDetail(woid);
    }
  }, [woid]);

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
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          multiline
          rows={4}
          value={data?.description || ""}
          name="description"
        />
      </Box>
      <Divider />
      <Typography variant="h5">發票記錄</Typography>
      {data &&
        data.tobill_invoice.map((invoice: TobillInvoiceDataType) => (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <TextField
                label="合約總額%數"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={invoice?.percentage || ""}
                name="percentage"
              />
              <DatePicker
                format="YYYY/MM/DD"
                label="發票日期"
                value={dayjs(invoice?.date) || ""}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
              />
              <TextField
                label="金額(未稅)"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={invoice?.amount || ""}
                name="amount"
              />
              <TextField
                label="發票號碼"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={invoice?.invoice_number || ""}
                name="invoice_number"
              />
              <TextField
                label="郵寄備註"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={invoice?.note || ""}
                name="note"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "stretch",
                gap: "1rem",
              }}>
              <DatePicker
                format="YYYY/MM/DD"
                label="郵寄日期"
                value={dayjs(invoice?.sent_date) || ""}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                  },
                }}
              />
              <TextField
                label="發票"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={invoice?.numbers_invoices || ""}
                name="numbers_invoices"
              />
              <TextField
                label="回郵信封"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={invoice?.numbers_envelope || ""}
                name="numbers_envelope"
              />
              <TextField
                label="報告書"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={invoice?.numbers_reports || ""}
                name="numbers_reports"
              />
              <TextField
                label="檢驗總表"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={invoice?.numbers_general_forms || ""}
                name="numbers_general_forms"
              />
              <TextField
                label="檢驗不良同意書"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={invoice?.numbers_inqualify_agreements || ""}
                name="numbers_inqualify_agreements"
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
        <DatePicker
          format="YYYY/MM/DD"
          label="請款-追蹤日期"
          value={dayjs(data?.tracking_date) || ""}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
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
          value={data?.tracking_description}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          name="tracking_description"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "stretch",
          gap: "1rem",
        }}>
        <FormControlLabel
          sx={{
            width: "30vw",
          }}
          control={
            <Checkbox
              size="small"
              checked={data?.tracking_is_finished || false}
              name="tracking_is_finished"
            />
          }
          label="請款作業完成與否"
        />
        <DatePicker
          format="YYYY/MM/DD"
          label="請款作業完成日期"
          value={dayjs(data?.tracking_date) || ""}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default WorksModal;
