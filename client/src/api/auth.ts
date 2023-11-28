import request from "./requests";

export const login = async (account: string, pw: string) => {
  return request("/api/v1/auth/login", {
    method: "POST",
    body: {
      account,
      password: pw,
    },
  });
};

export const retoken = async () => {
  return request("/api/v1/auth/token", {
    method: "POST",
    body: {
      token: localStorage.getItem("rf_token"),
    },
  });
};

export const status = async () => {
  return request("/api/v1/auth/status", {
    method: "GET",
    Headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
