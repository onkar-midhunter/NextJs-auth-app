"use client"
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
      if (token.length > 0) {
        verifyUserEmail();
      }
    }, [token]);
  return (
    <div>
      <h1>Verify Email</h1>
      <h2>{token ? `${token}` : "no token"}</h2>

      {isVerified && (
        <>
          
          <h2>User is Verified</h2>
          <Link href={"/login"}>Login</Link>
        </>
      )}
       {error&& (
        <>
          
          <h2>error is occurred</h2>
         
        </>
      )}


    </div>
  );
}

export default VerifyEmail;
