import request from "./requests";

export const getTrackings = async (orderBy: string, orderType: string) => {
  return request(
    `/api/v1/tracking?orderBy=${orderBy}&orderType=${orderType}`
  ).then((res) => res.data);
};
