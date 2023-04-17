import axios, { AxiosInstance } from "axios";
class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        console.log("error", error);
        if (error.response.status === 401) window.location.href = "/login";
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
