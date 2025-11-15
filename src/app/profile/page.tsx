"use client"
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast, { Toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function Profile() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const getUserData = async () => {
    try {
      const response = await axios.get("/api/user/currentUser");
      console.log(response);
      setData(response.data.data._id);
    } catch (error: any) {
      console.log(error.response?.data?.error);
      toast.error(error.message);
    }
  };

  const logOut = async () => {
    try {
      await axios.get("/api/user/logout");
      toast.success("logout success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.response?.data?.error);
      toast.error(error.message);
    }
  };

  return( <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
        <hr />
        <button
        onClick={logOut}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>

        <button
        onClick={getUserData}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>


            </div>
  
  </>);
}

export default Profile;
