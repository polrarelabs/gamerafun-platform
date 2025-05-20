import axios from "axios";

export const clearToken = async () => {
  delete axios.defaults.headers.common["Authorization"];
};

export const setToken = async (token: string) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    clearToken();
  }
};
