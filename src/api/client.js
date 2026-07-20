import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// The backend's controllers respond inconsistently: some send
// { success, data }, some send { message, data }, some send only
// { message }. This normalizes every response to its `data` payload
// (or the raw body if there is no `data` key).
apiClient.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data === "object" && "data" in response.data) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
    return Promise.reject(new Error(message));
  },
);
