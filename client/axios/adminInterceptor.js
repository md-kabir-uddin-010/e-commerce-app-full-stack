import axios from "axios";
import isExpired from "../services/isExpired";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const adminInterceptor = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

adminInterceptor.interceptors.request.use(
  async (req) => {
    const acces_token = localStorage.getItem("admin_acces_token");

    if (acces_token) {
      const expired = isExpired(acces_token);
      if (expired) {
        try {
          const { data } = await instance.post("/api/v1/auth/refresh/token", {
            refresh_token: `${localStorage.getItem("admin_refresh_token")}`,
          });
          localStorage.setItem("admin_acces_token", data.acces_token);
          localStorage.setItem("admin_refresh_token", data.refresh_token);
          req.headers.Authorization = `Bearer ${data.acces_token}`;

          if (req.url === "/api/v1/auth/logout") {
            req.data = `{"refresh_token":"${data.refresh_token}"}`;
          }
          return req;
        } catch (error) {
          localStorage.removeItem("admin_acces_token");
          localStorage.removeItem("admin_refresh_token");
        }
      }
    }

    req.headers.Authorization = `Bearer ${localStorage.getItem(
      "admin_acces_token"
    )}`;
    return req;
  },
  (err) => Promise.reject(err)
);

export default adminInterceptor;
