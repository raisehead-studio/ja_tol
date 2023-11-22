import request from "./requests";

import { WorkRequestDataType } from "../types/works";

export const getWorks = async () => {
  return request("/api/v1/work_orders").then((res) => res.data);
};

export const createWork = async (data: WorkRequestDataType) => {
  return request("/api/v1/work_orders/create_work_order", {
    method: "POST",
    body: data,
  });
};

export const getWorksDetail = async (id: string) => {};

export const getWorksDetailAssignment = async (id: string) => {
  return request(`/api/v1/work_orders/get_assignment_detail/${id}`).then(
    (res) => res.data
  );
};

export const getWorksDetailAcceptanceCheck = async (id: string) => {
  return request(`/api/v1/work_orders/get_acceptance_check_detail/${id}`).then(
    (res) => res.data
  );
};

export const getWorksDetailFactory = async (id: string) => {
  return request(`/api/v1/work_orders/get_factory_detail/${id}`).then(
    (res) => res.data
  );
};

export const getWorksDetailTobill = async (id: string) => {
  return request(`/api/v1/work_orders/get_tobill_detail/${id}`).then(
    (res) => res.data
  );
};
