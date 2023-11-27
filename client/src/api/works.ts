import request from "./requests";

import {
  WorkRequestDataType,
  WorkDetailRequestDataType,
  AssignmentRequestDataType,
  AssignmentPowerScheduleDataType,
  AssignmentPowerStopDataType,
  FactoryRequestDataType,
  FactoryOtherFormType,
  AcceptanceCheckRequestDataType,
  TobillRequestDataType,
  TobillInvoiceDataType,
} from "../types/works";

export const getWorks = async () => {
  return request("/api/v1/work_orders").then((res) => res.data);
};

export const getWorksDetail = async (id: string) => {
  return request(`/api/v1/work_orders/${id}`).then((res) => res.data);
};

export const updateWorkDetail = async (data: WorkDetailRequestDataType) => {
  return request("/api/v1/work_orders", {
    method: "PUT",
    body: data,
  });
};

export const createWork = async (data: WorkRequestDataType) => {
  return request("/api/v1/work_orders/create_work_order", {
    method: "POST",
    body: data,
  });
};

export const getWorksDetailAssignment = async (id: string) => {
  return request(`/api/v1/work_orders/get_assignment_detail/${id}`).then(
    (res) => res.data
  );
};

export const updateWorksDetailAssignment = async (
  data: AssignmentRequestDataType
) => {
  return request("/api/v1/work_orders/update_assignment", {
    method: "PUT",
    body: data,
  });
};

export const createManPowerSchedule = async (
  data: AssignmentPowerScheduleDataType
) => {
  return request("/api/v1/work_orders/create_manpower_schedule", {
    method: "POST",
    body: data,
  });
};

export const createManPowerStop = async (data: AssignmentPowerStopDataType) => {
  return request("/api/v1/work_orders/create_power_stop", {
    method: "POST",
    body: data,
  });
};

export const getWorksDetailAcceptanceCheck = async (id: string) => {
  return request(`/api/v1/work_orders/get_acceptance_check_detail/${id}`).then(
    (res) => res.data
  );
};

export const updateWorksDetailAcceptanceCheck = async (
  data: AcceptanceCheckRequestDataType
) => {
  return request("/api/v1/work_orders/update_acceptance_check", {
    method: "PUT",
    body: data,
  });
};

export const getWorksDetailFactory = async (id: string) => {
  return request(`/api/v1/work_orders/get_factory_detail/${id}`).then(
    (res) => res.data
  );
};

export const updateWorksDetailFactory = async (
  data: FactoryRequestDataType
) => {
  return request("/api/v1/work_orders/update_factory", {
    method: "PUT",
    body: data,
  });
};

export const createOtherForm = async (data: FactoryOtherFormType) => {
  return request("/api/v1/work_orders/create_factory_other_form", {
    method: "POST",
    body: data,
  });
};

export const getWorksDetailTobill = async (id: string) => {
  return request(`/api/v1/work_orders/get_tobill_detail/${id}`).then(
    (res) => res.data
  );
};

export const updateWorksDetailTobill = async (data: TobillRequestDataType) => {
  return request("/api/v1/work_orders/update_tobill", {
    method: "PUT",
    body: data,
  });
};

export const createInvoicebill = async (data: TobillInvoiceDataType) => {
  return request("/api/v1/work_orders/create_tobill_invoice", {
    method: "POST",
    body: data,
  });
};
