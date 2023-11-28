import request from "./requests";

export const getTrackings = async () => {
  return request("/api/v1/tracking").then((res) => res.data);
};
