"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const resetPassword = async () => {
    try {
      await axios.patch("/api/user/resetPassword", { token, password });
      setIsVerified(true);
      setError(false);
      router.push("/login");
    } catch (error: any) {
      console.log("error while verify email", error.response?.data);
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
    setError(false);
  }, []);

  useEffect(() => {
    setButtonDisabled(password.length === 0);
  }, [password]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">
        
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Reset Password
        </h1>

        {error && (
          <div className="text-red-400 bg-red-950 border border-red-700 p-3 rounded-lg mb-4 text-center">
            Something went wrong! Try again.
          </div>
        )}

        {isVerified && (
          <div className="text-green-400 bg-green-950 border border-green-700 p-3 rounded-lg mb-4 text-center">
            Your password has been reset!
          </div>
        )}

        <label className="block text-gray-300 mb-2 text-sm">
          Enter New Password
        </label>

        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 transition mb-4"
          placeholder="New password"
        />

        <button
          onClick={resetPassword}
          disabled={buttonDisabled}
          className={`w-full p-3 rounded-lg text-white font-semibold transition 
            ${
              buttonDisabled
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {buttonDisabled ? "Enter a password" : "Submit Password"}
        </button>

      </div>
    </div>
  );
}
