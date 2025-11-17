"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  // MAIN LOGIN FUNCTION
  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/user/login", user);
      toast.success("Login Successful");

      router.push("/profile");
    } catch (error: any) {
      const msg = error.response?.data?.error || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // FORGOT PASSWORD
  const forgotPassword = async () => {
    try {
      setForgotLoading(true);

      await axios.patch("/api/user/forgotPassword", {
        email: user.email,
      });

      setIsEmailSent(true);
      toast.success("Password reset email sent");
    } catch (error: any) {
      const msg =
        error.response?.data?.error || "Something went wrong";
      toast.error(msg);
    } finally {
      setForgotLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="bg-gray-900 border border-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          {loading ? "Processing..." : "Login"}
        </h1>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-gray-300 text-sm mb-1 block">Email</label>
          <input
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-blue-500 outline-none"
            placeholder="Enter your email"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="text-gray-300 text-sm mb-1 block">Password</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-blue-500 outline-none"
            placeholder="Enter your password"
          />
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={onLogin}
          disabled={buttonDisabled || loading}
          className={`w-full p-3 rounded-lg font-semibold transition ${
            buttonDisabled || loading
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* FORGOT PASSWORD */}
        <button
          onClick={forgotPassword}
          disabled={forgotLoading}
          className="w-full mt-3 p-2 text-sm text-blue-400 hover:text-blue-300 transition"
        >
          {forgotLoading ? "Sending email..." : "Forgot Password?"}
        </button>

        {/* EMAIL SENT MESSAGE */}
        {isEmailSent && (
          <p className="mt-3 text-green-400 text-sm text-center">
            ✔ Password reset email sent! Check your inbox.
          </p>
        )}

        <div className="text-center mt-6 text-gray-400">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:text-blue-300">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
