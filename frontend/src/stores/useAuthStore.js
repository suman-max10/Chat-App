/** @format */

import { create } from "zustand";
import { axiosInstanace } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIng: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstanace.get("/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      console.log("error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstanace.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create account");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIng: true });
    try {
      const res = await axiosInstanace.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to log in");
    } finally {
      set({ isLoggingIng: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstanace.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out succesfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to log out");
    }
  },

  updateProfile: async (profilePic) => {
    if (!profilePic) return;

    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstanace.put("/auth/updateProfile", {
        profilePic,
      });
      set((state) => ({
        authUser:
          state.authUser ?
            { ...state.authUser, profilePic: res.data.profilePic }
          : null,
      }));
      toast.success("Profile picture updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
