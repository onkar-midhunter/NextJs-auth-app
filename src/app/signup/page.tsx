"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    userName: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      //send data to backend By axios
      //setLoading true
      //recive response form backend
      //give us a console message abt how data is actually setting there

      setLoading(true);
      console.log("user after Submiting:",user);
      
      const response = await axios.post("/api/user/signup", user);
      console.log("sign Up success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup Failed:",  error.response?.data?.error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.userName.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
     <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <label htmlFor="username">username</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
            id="username"
            type="text"
            value={user.userName}
            onChange={(e) => setUser({...user, userName: e.target.value})}
            placeholder="username"
            />
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onSignUp}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}</button>
            <Link href="/login">Visit login page</Link>
        </div>
  );
}

export default SignUpPage;
