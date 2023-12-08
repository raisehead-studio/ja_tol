import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UpdateIcon from "@mui/icons-material/Update";
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
  updateWorkDetail,
  getWorksDetailAssignment,
  updateWorksDetailAssignment,
  getWorksDetailAcceptanceCheck,
  updateWorksDetailAcceptanceCheck,
  getWorksDetailFactory,
  updateWorksDetailFactory,
  getWorksDetailTobill,
  updateWorksDetailTobill,
} from "../api/works";

import {
  AssignmentDataType,
  AssignmentResponseDataType,
  AssignmentPowerScheduleDataType,
  AssignmentPowerStopDataType,
  FactoryDataType,
  FactoryOtherFormType,
  AcceptanceCheckDataType,
  TobillDataType,
  TobillInvoiceDataType,
  WorkOrderDetailResponseDataType,
} from "../types/works";

import CreateManPowerSchedule from "../components/CreateManPowerScheduleModal";
import CreateManPowerStop from "../components/CreateManPowerStopModal";
import CreateOtherForm from "../components/CreateOtherFormModal";
import CreateTobillInvoice from "../components/CreateTobillInvoiceModal";

const EditWorks = () => {
  let { woid } = useParams();
  const [data, setData] = useState<WorkOrderDetailResponseDataType | null>(
    null
  );
  const [assignment, setAssignment] = useState<AssignmentDataType | null>();
  const [factory, setFactory] = useState<FactoryDataType | null>();
  const [check, setCheck] = useState<AcceptanceCheckDataType | null>();
  const [bill, setBill] = useState<TobillDataType | null>();

  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleUpdate = () => {
    const update_list = [];
    setLoading(true);
    update_list.push(handleUpdateWorkDetail());
    update_list.push(handleUpdateAssignment());
    update_list.push(handleUpdateFactory());
    update_list.push(handleUpdateTobill());
    update_list.push(handleUpdateCheck());
    Promise.all(update_list)
      .then(() => {
        if (woid) {
          enqueueSnackbar("更新工單成功。", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          handleGetWorks(woid);
        }
        setLoading(false);
      })
      .catch((error: any) => {
        enqueueSnackbar(error.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      });
  };

  const handleUpdateWorkDetail = async () => {
    if (!data) return;
    try {
      let updateData = {
        woid,
        type: data.type,
        po: data.po,
        acceptance_check_date: data.acceptance_check_date,
        tobill_date: data.tobill_date,
        factory_date: data.factory_date,
        assignment_date: data.assignment_date,
      };

      await updateWorkDetail(updateData);
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

  const handleUpdateAssignment = async () => {
    if (!woid) return;
    try {
      let updateDta = {
        woid: woid,
        manufacturing_address: assignment?.manufacturing_address,
        manufacturing_status: assignment?.manufacturing_status,
        manufacturing_date: assignment?.manufacturing_date,
        external_contact_is_holiday:
          assignment?.external_contact_is_holiday || false,
        external_contact_is_power_stop:
          assignment?.external_contact_is_power_stop || false,
        is_assign_manpower: assignment?.is_assign_manpower || false,
        external_contact_request_date:
          assignment?.external_contact_request_date,
        external_contact_receive_date:
          assignment?.external_contact_receive_date,
        tracking_date: assignment?.tracking_date,
        tracking_description: assignment?.tracking_description,
        tracking_is_finished: assignment?.tracking_is_finished || false,
        tracking_finished_date: assignment?.tracking_finished_date,
        manpower_schedule:
          JSON.stringify(assignment?.manpower_schedule) || "[]",
        power_stop: JSON.stringify(assignment?.power_stop) || "[]",
      };

      await updateWorksDetailAssignment(updateDta);
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

  const handleUpdateFactory = async () => {
    if (!woid) return;
    try {
      let updateDta = {
        woid: woid,
        description: factory?.description,
        tracking_date: factory?.tracking_date,
        tracking_description: factory?.tracking_description,
        tracking_is_finished: factory?.tracking_is_finished || false,
        finished_date: factory?.finished_date,
        factory_other_form: JSON.stringify(factory?.factory_other_form) || "[]",
      };

      await updateWorksDetailFactory(updateDta);
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

  const handleUpdateCheck = async () => {
    if (!woid) return;
    try {
      let updateDta = {
        woid: woid,
        description: check?.description,
        is_photo_before: check?.is_photo_before,
        is_photo_during: check?.is_photo_during,
        is_photo_after: check?.is_photo_after,
        power_switch_date1: check?.power_switch_date1,
        power_switch_date2: check?.power_switch_date2,
        power_switch_date3: check?.power_switch_date3,
        power_switch_date4: check?.power_switch_date4,
        defect_agreement: check?.defect_agreement,
        report_type: check?.report_type,
        ew06_registration: check?.ew06_registration,
        fom17_registration_government_date:
          check?.fom17_registration_government_date,
        fom17_registration_ele_date: check?.fom17_registration_ele_date,
        is_warranty: check?.is_warranty,
        tracking_date: check?.tracking_date,
        tracking_description: check?.tracking_description,
        tracking_is_finished: check?.tracking_is_finished,
        finished_date: check?.finished_date,
        wt_report_number: check?.wt_report_number,
        is_inspection_report_retrieved: check?.is_inspection_report_retrieved,
        is_inspection_report_retrieved_date:
          check?.is_inspection_report_retrieved_date,
      };

      await updateWorksDetailAcceptanceCheck(updateDta);
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

  const handleUpdateTobill = async () => {
    if (!woid) return;
    try {
      let updateDta = {
        woid: woid,
        description: bill?.description,
        tracking_date: bill?.tracking_date,
        tracking_description: bill?.tracking_description,
        tracking_is_finished: bill?.tracking_is_finished || false,
        finished_date: bill?.finished_date,
        tobill_invoice: JSON.stringify(bill?.tobill_invoice) || "[]",
      };

      await updateWorksDetailTobill(updateDta);
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

  const handleGetWorks = async (woid: string) => {
    try {
      const work = await getWorksDetail(woid);
      setData(work);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleGetWorks = async (woid: string) => {
      setLoading(true);

      try {
        const work = await getWorksDetail(woid);
        setData(work);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (woid) {
      handleGetWorks(woid);
    }
  }, [woid]);

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
                label="工單類型"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={data?.type || ""}
                onChange={handleUpdateFiled}
                name="type"
              />
              <TextField
                label="採購PO (複選)"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={data?.po || ""}
                onChange={handleUpdateFiled}
                name="po"
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
          <EditWorksAssignments
            tab={tab}
            woid={woid}
            setAssignment={setAssignment}
          />
          <EditWorksAcceptanceCheck tab={tab} woid={woid} setCheck={setCheck} />
          <EditWorksFactory tab={tab} woid={woid} setFactory={setFactory} />
          <EditWorksTobill tab={tab} woid={woid} setBill={setBill} />
          <Divider />
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
              onClick={handleUpdate}>
              儲存
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

const EditWorksAssignments = ({
  tab,
  woid,
  setAssignment,
}: {
  tab: number;
  woid: string | undefined;
  setAssignment: (data: any) => void;
}) => {
  const [data, setData] = useState<AssignmentResponseDataType | null>(null);
  const [handleOpenManPowerSchedule, setHandleOpenManPowerSchedule] =
    useState(false);
  const [openPowerStop, setOpenPowerStop] = useState(false);

  const handleOpenManPowerScheduleModal = () =>
    setHandleOpenManPowerSchedule(true);

  const handleCloseManPowerScheduleModal = () =>
    setHandleOpenManPowerSchedule(false);

  const handleOpenPowerStopModal = () => setOpenPowerStop(true);

  const handleClosePowerStopModal = () => setOpenPowerStop(false);

  const handleUpdateFiled = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (!data) return;
    let updateDate = {
      ...data,
      [name]: type === "checkbox" ? checked : value,
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

  const handleUpdateRowData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string | undefined,
    data_name: string
  ) => {
    if (!data || !id) return;
    const { name, value } = e.target;
    let selected_row:
      | AssignmentPowerScheduleDataType[]
      | AssignmentPowerStopDataType[];
    if (data_name === "manpower_schedule") {
      selected_row = data.manpower_schedule;
      let updateDate = {
        ...data,
        manpower_schedule: selected_row.map(
          (item: AssignmentPowerScheduleDataType) => {
            if (item.id === id) {
              return {
                ...item,
                [name]: value,
              };
            } else {
              return item;
            }
          }
        ),
      };
      setData(updateDate);
    } else if (data_name === "power_stop") {
      selected_row = data.power_stop;
      let updateDate = {
        ...data,
        power_stop: selected_row.map((item: AssignmentPowerStopDataType) => {
          if (item.id === id) {
            return {
              ...item,
              [name]: value,
            };
          } else {
            return item;
          }
        }),
      };
      setData(updateDate);
    }
  };

  const handleUpdateRowDate = (
    value: any,
    id: string | undefined,
    data_name: string,
    name: string
  ) => {
    if (!data || !id) return;
    let selected_row:
      | AssignmentPowerScheduleDataType[]
      | AssignmentPowerStopDataType[];
    if (data_name === "manpower_schedule") {
      selected_row = data.manpower_schedule;
      let updateDate = {
        ...data,
        manpower_schedule: selected_row.map(
          (item: AssignmentPowerScheduleDataType) => {
            if (item.id === id) {
              return {
                ...item,
                [name]: new Date(value.$d).getTime(),
              };
            } else {
              return item;
            }
          }
        ),
      };
      setData(updateDate);
    } else if (data_name === "power_stop") {
      selected_row = data.power_stop;
      let updateDate = {
        ...data,
        power_stop: selected_row.map((item: AssignmentPowerStopDataType) => {
          if (item.id === id) {
            return {
              ...item,
              [name]: new Date(value.$d).getTime(),
            };
          } else {
            return item;
          }
        }),
      };
      setData(updateDate);
    }
  };

  useEffect(() => {
    setAssignment(data);
  }, [setAssignment, data]);

  useEffect(() => {
    const handleGetAssignmentDetail = async (id: string) => {
      try {
        const assignments = await getWorksDetailAssignment(id);
        setData(assignments);
      } catch (error) {
        console.log(error);
      }
    };
    if (woid && !handleOpenManPowerSchedule && !openPowerStop) {
      handleGetAssignmentDetail(woid);
    }
  }, [woid, handleOpenManPowerSchedule, openPowerStop]);

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
          onChange={handleUpdateFiled}
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
          onChange={handleUpdateFiled}
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
          onChange={(newValue) =>
            handleUpdateDate(newValue, "manufacturing_date")
          }
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
              onChange={(newValue) =>
                handleUpdateRowDate(
                  newValue,
                  manpower.id,
                  "manpower_schedule",
                  "started_time"
                )
              }
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
              onChange={(newValue) =>
                handleUpdateRowDate(
                  newValue,
                  manpower.id,
                  "manpower_schedule",
                  "finished_time"
                )
              }
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
              onChange={(newValue) =>
                handleUpdateRowDate(
                  newValue,
                  manpower.id,
                  "manpower_schedule",
                  "actual_date"
                )
              }
            />
            <TextField
              label="備註"
              name="name"
              size="small"
              value={manpower?.note}
              InputLabelProps={{ shrink: true }}
              fullWidth
              onChange={(e) =>
                handleUpdateRowData(e, manpower.id, "manpower_schedule")
              }
            />
          </Box>
        ))}
      <Box>
        <Button
          startIcon={<AddIcon />}
          onClick={handleOpenManPowerScheduleModal}>
          新增施工時間及人力安排
        </Button>
      </Box>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={data?.is_assign_manpower || false}
              onChange={handleUpdateFiled}
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
              onChange={(e) => handleUpdateRowData(e, stop.id, "power_stop")}
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
              onChange={(newValue) =>
                handleUpdateRowDate(
                  newValue,
                  stop.id,
                  "power_stop",
                  "started_date"
                )
              }
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
              onChange={(newValue) =>
                handleUpdateRowDate(
                  newValue,
                  stop.id,
                  "finished_date",
                  "finished_time"
                )
              }
            />
          </Box>
        ))}
      <Box>
        <Button startIcon={<AddIcon />} onClick={handleOpenPowerStopModal}>
          新增停電狀況
        </Button>
      </Box>
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
              onChange={handleUpdateFiled}
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
              onChange={handleUpdateFiled}
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
          onChange={(newValue) => handleUpdateDate(newValue, "actual_date")}
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
          onChange={(newValue) => handleUpdateDate(newValue, "actual_date")}
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
          onChange={(newValue) => handleUpdateDate(newValue, "tracking_date")}
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
          value={data?.tracking_description}
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          name="tracking_description"
          onChange={handleUpdateFiled}
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
              onChange={handleUpdateFiled}
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
          onChange={(newValue) =>
            handleUpdateDate(newValue, "tracking_finished_date")
          }
          disabled={!data?.tracking_is_finished}
        />
      </Box>
      <CreateManPowerSchedule
        aid={data?.id || ""}
        open={handleOpenManPowerSchedule}
        handleClose={handleCloseManPowerScheduleModal}
      />
      <CreateManPowerStop
        aid={data?.id || ""}
        open={openPowerStop}
        handleClose={handleClosePowerStopModal}
      />
    </Box>
  );
};

const EditWorksFactory = ({
  tab,
  woid,
  setFactory,
}: {
  tab: number;
  woid: string | undefined;
  setFactory: (data: any) => void;
}) => {
  const [data, setData] = useState<FactoryDataType | null>(null);
  const [openOtherForm, setOpenOtherForm] = useState(false);

  const handleOpenOtherFormModal = () => setOpenOtherForm(true);

  const handleCloseOtherFormModal = () => setOpenOtherForm(false);

  useEffect(() => {
    setFactory(data);
  }, [setFactory, data]);

  useEffect(() => {
    const handleGetFactoryDetail = async (id: string) => {
      try {
        const factory = await getWorksDetailFactory(id);
        setData(factory);
      } catch (error) {
        console.log(error);
      }
    };
    if (woid && !openOtherForm) {
      handleGetFactoryDetail(woid);
    }
  }, [woid, openOtherForm]);

  const handleUpdateFiled = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (!data) return;
    let updateDate = {
      ...data,
      [name]: type === "checkbox" ? checked : value,
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

  const handleUpdateRowData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string | undefined,
    type: string
  ) => {
    if (!data || !id) return;
    const { name, value } = e.target;
    let update_val: string | boolean;
    if (type !== "select") {
      update_val = value;
    } else {
      if (+value > 0) {
        update_val = false;
      } else {
        update_val = true;
      }
    }

    let selected_row: FactoryOtherFormType[];
    selected_row = data.factory_other_form;
    let updateDate = {
      ...data,
      factory_other_form: selected_row.map((item: FactoryOtherFormType) => {
        if (item.id === id) {
          return {
            ...item,
            [name]: update_val,
          };
        } else {
          return item;
        }
      }),
    };
    setData(updateDate);
  };

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
          onChange={handleUpdateFiled}
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
                select
                onChange={(e) => handleUpdateRowData(e, form.id, "select")}>
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
                name="is_group_insurance"
                onChange={(e) => handleUpdateRowData(e, form.id, "select")}>
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
                name="is_label_insurance"
                onChange={(e) => handleUpdateRowData(e, form.id, "select")}>
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
                name="is_bunny_shoe"
                onChange={(e) => handleUpdateRowData(e, form.id, "select")}>
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
                name="is_bunny_suit"
                onChange={(e) => handleUpdateRowData(e, form.id, "select")}>
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
                onChange={(e) => handleUpdateRowData(e, form.id, "text")}
                name="other_form"
              />
            </Box>
          </>
        ))}
      <Box>
        <Button startIcon={<AddIcon />} onClick={handleOpenOtherFormModal}>
          新增其他表格
        </Button>
      </Box>
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
          onChange={(newValue) => handleUpdateDate(newValue, "tracking_date")}
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
          onChange={handleUpdateFiled}
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
              onChange={handleUpdateFiled}
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
          onChange={(newValue) =>
            handleUpdateDate(newValue, "tracking_finished_date")
          }
          disabled={!data?.tracking_is_finished}
        />
      </Box>
      <CreateOtherForm
        fid={data?.id || ""}
        open={openOtherForm}
        handleClose={handleCloseOtherFormModal}
      />
    </Box>
  );
};

const EditWorksAcceptanceCheck = ({
  tab,
  woid,
  setCheck,
}: {
  tab: number;
  woid: string | undefined;
  setCheck: (data: any) => void;
}) => {
  const [data, setData] = useState<AcceptanceCheckDataType | null>(null);

  useEffect(() => {
    setCheck(data);
  }, [setCheck, data]);

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

  const handleUpdateFiled = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (!data) return;
    let updateDate = {
      ...data,
      [name]: type === "checkbox" ? checked : value,
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

  const handleUpdateSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let update_val: boolean;
    if (+value > 0) {
      update_val = false;
    } else {
      update_val = true;
    }
    if (!data) return;
    let updateDate = {
      ...data,
      [name]: update_val,
    };
    setData(updateDate);
  };

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
          onChange={handleUpdateFiled}
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
              onChange={handleUpdateFiled}
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
              onChange={handleUpdateFiled}
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
              onChange={handleUpdateFiled}
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
          onChange={(newValue) =>
            handleUpdateDate(newValue, "power_switch_date1")
          }
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
          onChange={(newValue) =>
            handleUpdateDate(newValue, "power_switch_date2")
          }
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
          onChange={(newValue) =>
            handleUpdateDate(newValue, "power_switch_date3")
          }
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
          onChange={(newValue) =>
            handleUpdateDate(newValue, "power_switch_date4")
          }
        />
        <TextField
          label="缺失同意書"
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={data?.defect_agreement || ""}
          name="defect_agreement"
          onChange={handleUpdateFiled}
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
          label="取回檢驗總表2張"
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={data?.is_inspection_report_retrieved ? 0 : 1}
          name="is_inspection_report_retrieved"
          onChange={handleUpdateSelection}
          select>
          <MenuItem value={0}>取回</MenuItem>
          <MenuItem value={1}>尚未取回</MenuItem>
        </TextField>
        <DatePicker
          format="YYYY/MM/DD"
          label="檢驗總表取回日期"
          value={dayjs(data?.is_inspection_report_retrieved_date) || ""}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
            },
          }}
          onChange={(newValue) =>
            handleUpdateDate(newValue, "is_inspection_report_retrieved_date")
          }
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
          onChange={handleUpdateFiled}
        />
        <TextField
          label="登入EW60"
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={data?.ew06_registration || ""}
          name="ew06_registration"
          onChange={handleUpdateFiled}
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
          onChange={(newValue) =>
            handleUpdateDate(newValue, "fom17_registration_government_date")
          }
        />
        <TextField
          label="一七申報(台電)郵寄日期"
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={data?.report_type || ""}
          name="report_type"
          onChange={handleUpdateFiled}
        />
        <TextField
          label="保固書"
          size="small"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={data?.is_warranty ? 0 : 1}
          name="is_warranty"
          onChange={handleUpdateSelection}
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
          onChange={(newValue) => handleUpdateDate(newValue, "tracking_date")}
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
          onChange={handleUpdateFiled}
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
              onChange={handleUpdateFiled}
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
          disabled={!data?.tracking_is_finished}
          onChange={(newValue) =>
            handleUpdateDate(newValue, "tracking_finished_date")
          }
        />
      </Box>
    </Box>
  );
};

const EditWorksTobill = ({
  tab,
  woid,
  setBill,
}: {
  tab: number;
  woid: string | undefined;
  setBill: (data: any) => void;
}) => {
  const [data, setData] = useState<TobillDataType | null>(null);
  const [openTobillInvoice, setOpenTobillInvoice] = useState(false);

  const handleOpenTobillInvoiceModal = () => setOpenTobillInvoice(true);

  const handleCloseTobillInvoiceModal = () => setOpenTobillInvoice(false);

  useEffect(() => {
    setBill(data);
  }, [setBill, data]);

  useEffect(() => {
    const handleGetFactoryDetail = async (id: string) => {
      try {
        const factory = await getWorksDetailTobill(id);
        setData(factory);
      } catch (error) {
        console.log(error);
      }
    };
    if (woid && !openTobillInvoice) {
      handleGetFactoryDetail(woid);
    }
  }, [woid, openTobillInvoice]);

  const handleUpdateFiled = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (!data) return;
    let updateDate = {
      ...data,
      [name]: type === "checkbox" ? checked : value,
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

  const handleUpdateRowData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string | undefined
  ) => {
    if (!data || !id) return;
    const { name, value } = e.target;
    let selected_row: TobillInvoiceDataType[];
    selected_row = data.tobill_invoice;
    let updateDate = {
      ...data,
      tobill_invoice: selected_row.map((item: TobillInvoiceDataType) => {
        if (item.id === id) {
          return {
            ...item,
            [name]: value,
          };
        } else {
          return item;
        }
      }),
    };
    setData(updateDate);
  };

  const handleUpdateRowDate = (
    value: any,
    id: string | undefined,
    name: string
  ) => {
    if (!data || !id) return;
    let selected_row: TobillInvoiceDataType[];
    selected_row = data.tobill_invoice;
    let updateDate = {
      ...data,
      tobill_invoice: selected_row.map((item: TobillInvoiceDataType) => {
        if (item.id === id) {
          return {
            ...item,
            [name]: new Date(value.$d).getTime(),
          };
        } else {
          return item;
        }
      }),
    };
    setData(updateDate);
  };

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
          onChange={handleUpdateFiled}
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
                onChange={(e) => handleUpdateRowData(e, invoice.id)}
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
                onChange={(newValue) =>
                  handleUpdateRowDate(newValue, invoice.id, "date")
                }
              />
              <TextField
                label="金額(未稅)"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={invoice?.amount || ""}
                name="amount"
                onChange={(e) => handleUpdateRowData(e, invoice.id)}
              />
              <TextField
                label="發票號碼"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={invoice?.invoice_number || ""}
                name="invoice_number"
                onChange={(e) => handleUpdateRowData(e, invoice.id)}
              />
              <TextField
                label="郵寄備註"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={invoice?.note || ""}
                name="note"
                onChange={(e) => handleUpdateRowData(e, invoice.id)}
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
                onChange={(newValue) =>
                  handleUpdateRowDate(newValue, invoice.id, "sent_date")
                }
              />
              <TextField
                label="發票"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={invoice?.numbers_invoices || ""}
                name="numbers_invoices"
                onChange={(e) => handleUpdateRowData(e, invoice.id)}
              />
              <TextField
                label="回郵信封"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={invoice?.numbers_envelope || ""}
                name="numbers_envelope"
                onChange={(e) => handleUpdateRowData(e, invoice.id)}
              />
              <TextField
                label="報告書"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={invoice?.numbers_reports || ""}
                name="numbers_reports"
                onChange={(e) => handleUpdateRowData(e, invoice.id)}
              />
              <TextField
                label="檢驗總表"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={invoice?.numbers_general_forms || ""}
                name="numbers_general_forms"
                onChange={(e) => handleUpdateRowData(e, invoice.id)}
              />
              <TextField
                label="檢驗不良同意書"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={invoice?.numbers_inqualify_agreements || ""}
                name="numbers_inqualify_agreements"
                onChange={(e) => handleUpdateRowData(e, invoice.id)}
              />
            </Box>
          </>
        ))}
      <Box>
        <Button startIcon={<AddIcon />} onClick={handleOpenTobillInvoiceModal}>
          新增發票記錄
        </Button>
      </Box>
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
          onChange={(newValue) => handleUpdateDate(newValue, "tracking_date")}
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
          onChange={handleUpdateFiled}
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
              onChange={handleUpdateFiled}
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
          disabled={!data?.tracking_is_finished}
          onChange={(newValue) =>
            handleUpdateDate(newValue, "tracking_finished_date")
          }
        />
      </Box>
      <CreateTobillInvoice
        tbid={data?.id || ""}
        open={openTobillInvoice}
        handleClose={handleCloseTobillInvoiceModal}
      />
    </Box>
  );
};

export default EditWorks;
