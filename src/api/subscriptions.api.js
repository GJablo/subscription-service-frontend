import { apiClient } from "./client";

export const getSubscriptions = () => apiClient.get("/subscriptions");

export const getUserSubscriptions = (userId) =>
  apiClient.get(`/subscriptions/user/${userId}`);

export const getSubscriptionById = (id) => apiClient.get(`/subscriptions/${id}`);

export const createSubscription = (payload) =>
  apiClient.post("/subscriptions", payload);

export const updateSubscription = (id, payload) =>
  apiClient.put(`/subscriptions/${id}`, payload);

export const deleteSubscription = (id) => apiClient.delete(`/subscriptions/${id}`);

export const cancelSubscription = (id) => apiClient.post(`/subscriptions/cancel/${id}`);
