"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function VerifyEmail() {
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/user/verifyemail", { token });
      setIsVerified(true);
      setError(false);
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
    if (token.length > 0) verifyUserEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700 text-center">
        
        <h1 className="text-3xl font-bold text-white mb-4">Verify Email</h1>

        {/* Token Display */}
        <p className="text-gray-400 text-sm break-all mb-6">
          {token ? `Verifying token: ${token}` : "No token found"}
        </p>

        {/* Success Message */}
        {isVerified && (
          <div className="bg-green-900 border border-green-700 text-green-300 p-4 rounded-lg mb-6">
            Your email has been successfully verified!
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-300 p-4 rounded-lg mb-6">
            Verification failed. Invalid or expired token.
          </div>
        )}

        {/* Login Button after success */}
        {isVerified && (
          <Link
            href="/login"
            className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Go to Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
