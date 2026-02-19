"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  const [tab, setTab] = useState<"login" | "register">("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { login, register, loading, error } = useAuth();

  /* Submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (tab === "login") {
      await login(email, password);
    } else {
      const success = await register(
        name,
        email,
        password,
        confirmPassword
      );

      if (success) setTab("login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#120e09] via-[#1d160e] to-[#120e09] px-4 text-slate-100">

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-[#ec9213]/20 bg-[#1a140d]/90 backdrop-blur-xl">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-[radial-gradient(circle_at_top,#ec921320,transparent_60%)]">

          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-11 h-11 rounded-xl bg-[#ec9213] flex items-center justify-center text-black text-xl font-bold">
                🚘
              </div>

              <span className="text-2xl font-bold">
                Velocity<span className="text-[#ec9213]">Drive</span>
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Drive the <br />
              <span className="text-[#ec9213]">Future of Luxury</span>
            </h1>

            <p className="mt-4 text-slate-400">
              Premium vehicles and elite comfort.
            </p>
          </div>

          <p className="text-sm text-slate-400">
            <span className="text-white font-semibold">2.5k+</span> members
          </p>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">

          {/* TOGGLE */}
          <div className="mb-8">
            <div className="flex bg-[#120e09] rounded-xl p-1 max-w-xs mx-auto">

              <button
                onClick={() => setTab("login")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                  tab === "login"
                    ? "bg-[#ec9213] text-black"
                    : "text-slate-400"
                }`}
              >
                Login
              </button>

              <button
                onClick={() => setTab("register")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                  tab === "register"
                    ? "bg-[#ec9213] text-black"
                    : "text-slate-400"
                }`}
              >
                Register
              </button>

            </div>
          </div>

          {/* TITLE */}
          <h2 className="text-3xl font-bold mb-2">
            {tab === "login" ? "Welcome back" : "Create account"}
          </h2>

          {/* ERROR */}
          {error && (
            <p className="mb-4 text-sm text-red-400">{error}</p>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {tab === "register" && (
              <input
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#120e09] border border-[#ec9213]/20 focus:border-[#ec9213] outline-none"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#120e09] border border-[#ec9213]/20 focus:border-[#ec9213] outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#120e09] border border-[#ec9213]/20 focus:border-[#ec9213] outline-none"
            />

            {tab === "register" && (
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
                className="w-full px-4 py-3 rounded-xl bg-[#120e09] border border-[#ec9213]/20 focus:border-[#ec9213] outline-none"
              />
            )}

            <button
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#ec9213] text-black font-bold hover:brightness-110 disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : tab === "login"
                ? "Sign In"
                : "Create Account"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}
