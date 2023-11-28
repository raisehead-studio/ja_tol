import { retoken } from "../api/auth";

export const refreshToken = async () => {
  if (!localStorage.getItem("rf_token")) {
    window.location.href = "/login";
    localStorage.clear();
  } else {
    const token = await retoken();
    if (token.status === 200) {
      localStorage.setItem("token", token.data.accessToken);
      return false;
    }
  }
};
