// src/api/authApi.ts
import apiClient from "./apiClient";

export const login = async (data: any) => {
  const res = await apiClient.post("/auth/login", data);
  return res.data;
};

export const signup = async (data: any) => {
  const res = await apiClient.post("/auth/signup", data);
  return res.data;
};

export const updateProfile = async (data: any) => {
  const res = await apiClient.put("/auth/profile", data);
  return res.data;
};

export const forgotPassword = async (email: string) => {
  const res = await apiClient.post("/auth/forgot-password", { email });
  return res.data;
};
