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

export const getServiceDetail = async (id: string) => {
  return request(`/api/v1/service/${id}`).then((res) => res.data);
};

export const handleUpdateServiceDetail = async (data: any) => {
  return request("/api/v1/service/update_service", {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
