"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      //send data to backend By axios
      //setLoading true
      //recive response form backend
      //give us a console message abt how data is actually setting there

      setLoading(true);
      console.log("user after Submiting:", user);

      const response = await axios.post("/api/user/login", user);
      console.log("log in success", response.data);
      router.push("/profile");
    } catch (error: any) {
      const msg = error.response?.data?.error || "Login failed";
      toast.error(msg);
      console.log("login Failed:", msg);
    } finally {
      setLoading(false);
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "No login" : "login"}
      </button>
      <Link href="/signup">Visit sign up page</Link>
    </div>
  );
}

export default LoginPage;
