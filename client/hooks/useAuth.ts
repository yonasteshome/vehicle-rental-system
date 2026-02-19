"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export function useAuth() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* Reset error */
  const resetError = () => setError(null);

  /* LOGIN */
  const login = async (email: string, password: string) => {
    resetError();
    setLoading(true);

    try {
      await api.post("/auth/login", {
        email,
        password,
      });

      // Cookie is set by backend
      router.push("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* REGISTER */
  const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    resetError();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    setLoading(true);

    try {
      await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      return true;
    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    loading,
    error,
  };
}
