"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Profile() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserData = async () => {
    try {
      const response = await axios.get("/api/user/currentUser");
      setData(response.data.data._id);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const logOut = async () => {
    try {
      await axios.get("/api/user/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Profile
        </h1>

        <p className="text-gray-400 text-center mb-6">
          Welcome to your profile page.
        </p>

        <div className="text-center mb-6">
          <h2 className="text-gray-300 mb-2">Your User ID</h2>
          <div className="p-2 rounded-lg bg-gray-700 text-white font-mono break-all">
            {data === "nothing" ? (
              "No data"
            ) : (
              <Link
                href={`/profile/${data}`}
                className="text-blue-400 hover:underline"
              >
                {data}
              </Link>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={getUserData}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Load User Data
          </button>

          <button
            onClick={logOut}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;
