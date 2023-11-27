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
