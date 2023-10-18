import request from "./requests";

import { ServiceRequestDataType } from "../types/services";

export const getServices = async () => {
  return request("/api/v1/service").then((res) => res.data);
};

export const createServices = async (data: ServiceRequestDataType) => {
  return request("/api/v1/service/create_service", {
    method: "POST",
    body: data,
  });
};
