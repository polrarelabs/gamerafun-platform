import axios from "axios";

export const setToken = async (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearToken = async () => {
  axios.defaults.headers.common["Authorization"] = "";
};
