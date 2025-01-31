"use client";

import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { logout as logoutUser } from "@/components/globals/auth";

const LogoutBtn = () => {
  const logout = async () => {
    logoutUser().then((response) => {
      toast.success(response.message);
    });
  };

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
