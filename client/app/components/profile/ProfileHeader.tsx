"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function ProfileHeader() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.data);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:block text-right">
        <p className="text-sm font-semibold">{user.name}</p>
        <p className="text-xs text-[#ec9213] uppercase">
          {user.role}
        </p>
      </div>

      <div className="w-10 h-10 rounded-full border-2 border-[#ec9213] flex items-center justify-center">
        <span className="material-icons text-[#ec9213]">
          person
        </span>
      </div>
    </div>
  );
}