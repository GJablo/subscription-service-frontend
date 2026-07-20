import { apiClient } from "./client";

export const signUp = (payload) => apiClient.post("/auth/sign-up", payload);

export const signIn = (payload) => apiClient.post("/auth/sign-in", payload);

export const signOut = () => apiClient.post("/auth/sign-out");
