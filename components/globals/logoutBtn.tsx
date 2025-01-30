"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

const LogoutBtn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const logout = () => {
    setIsLoggedIn(false);
    toast.success("Logged Out");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      sessionStorage.clear();
    }
  }, [isLoggedIn]);

  return (
    <>
      <Link href="/" className="text-center" onClick={logout}>
        <h3
          className={
            "text-sm md:text-base font-semibold text-white cursor-pointer"
          }
        >
          Logout
        </h3>
      </Link>
    </>
  );
};

export default LogoutBtn;
