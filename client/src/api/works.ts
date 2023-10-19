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
