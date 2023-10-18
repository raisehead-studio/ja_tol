import request from "./requests";

export const getWorks = async () => {
  return request("/api/v1/work_orders").then((res) => res.data);
};
