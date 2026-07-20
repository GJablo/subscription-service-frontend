import { apiClient } from "./client";

export const getUsers = () => apiClient.get("/users");

export const getUser = (id) => apiClient.get(`/users/${id}`);
