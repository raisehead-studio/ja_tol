import request from "./requests";
import { UsersType } from "../types/users";

export const getUsers = async () => {
  return request(`/api/v1/users`).then((res) => res.data);
};

export const getUser = async (id: string) => {
  return request(`/api/v1/users/${id}`).then((res) => res.data);
};

// export const updateWorkDetail = async (data) => {
//   return request("/api/v1/work_orders", {
//     method: "PUT",
//     body: data,
//   });
// };

export const createUser = async (data: UsersType) => {
  return request("/api/v1/users", {
    method: "POST",
    body: data,
  });
};

export const updateUser = async (data: UsersType) => {
  return request("/api/v1/users", {
    method: "PUT",
    body: data,
  });
};

export const deleteUser = async (id: string | undefined) => {
  return request(`/api/v1/users/${id}`, {
    method: "DELETE",
  }).then((res) => res);
};
