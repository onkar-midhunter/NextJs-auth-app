"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/signup", user);
      console.log("Sign Up success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup Failed:", error.response?.data?.error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isValid =
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.userName.length > 0;

    setButtonDisabled(!isValid);
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          {loading ? "Processing..." : "Create an Account"}
        </h1>

        {/* USERNAME */}
        <label htmlFor="username" className="text-gray-300 block mb-1">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white mb-4 focus:outline-none focus:border-blue-500"
          placeholder="Enter username"
          value={user.userName}
          onChange={(e) =>
            setUser({ ...user, userName: e.target.value })
          }
        />

        {/* EMAIL */}
        <label htmlFor="email" className="text-gray-300 block mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white mb-4 focus:outline-none focus:border-blue-500"
          placeholder="Enter email"
          value={user.email}
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <label htmlFor="password" className="text-gray-300 block mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white mb-6 focus:outline-none focus:border-blue-500"
          placeholder="Enter password"
          value={user.password}
          onChange={(e) =>
            setUser({ ...user, password: e.target.value })
          }
        />

        {/* SIGNUP BUTTON */}
        <button
          onClick={onSignUp}
          disabled={buttonDisabled}
          className={`w-full py-3 rounded-lg text-white font-semibold transition
            ${
              buttonDisabled
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {buttonDisabled ? "Fill all details" : "Sign Up"}
        </button>

        {/* LOGIN LINK */}
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
