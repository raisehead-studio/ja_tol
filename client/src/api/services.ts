import request from "./requests";

export const getServices = async () => {
  return request("/api/v1/service").then((res) => res.data);
};
