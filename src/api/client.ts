import axios, { AxiosError, AxiosRequestConfig, HttpStatusCode } from "axios";
import { API_TIMEOUT, API_URL } from "constant";
import { ErrorResponse } from "constant/types";
import { sleep } from "utils/index";

const requestAbortCode = "ECONNABORTED";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.timeout = API_TIMEOUT;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error as AxiosError)?.config &&
      ((error.code === requestAbortCode &&
        (error as AxiosError)?.response?.status ===
          HttpStatusCode.TooManyRequests) ||
        ("response" in error && error.response === undefined))
    ) {
      sleep(1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      axios.request((error as AxiosError).config as AxiosRequestConfig<any>);
    }

    let messageError = ((error as AxiosError)?.response?.data as ErrorResponse)
      ?.message;

    messageError = Array.isArray(messageError)
      ? messageError.join(", ")
      : messageError;

    return Promise.reject(messageError ?? error);
  },
);

const RequestClient = class {
  constructor() {
    //
  }

  async get(endpoint: string, params = {}, configs = {}) {
    try {
      const response = await axios.get(endpoint, {
        params,
        ...configs,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async post(endpoint: string, body?: {}, configs = {}) {
    try {
      const response = await axios.post(endpoint, body, configs);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async put(endpoint: string, body: {}, configs = {}) {
    try {
      const response = await axios.put(endpoint, body, configs);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async patch(endpoint: string, body: {}, configs = {}) {
    try {
      const response = await axios.patch(endpoint, body, configs);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async delete(endpoint: string, data?: {}) {
    try {
      const response = await axios.delete(endpoint, { data });
      return response;
    } catch (error) {
      throw error;
    }
  }
};

const client = new RequestClient();

export { client };
