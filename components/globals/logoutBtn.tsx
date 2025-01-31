"use client";

import React from "react";
import toast from "react-hot-toast";
import { logout as logoutUser } from "@/components/globals/auth";
import { useRouter } from "next/navigation";

const LogoutBtn = () => {
  const router = useRouter();

  const logout = async () => {
    logoutUser().then((response) => {
      router.push("/");
      toast.success(response.message);
    });
  };

  return (
    <>
      <div className="text-center" onClick={logout}>
        <h3
          className={
            "text-sm md:text-base font-semibold text-white cursor-pointer"
          }
        >
          Logout
        </h3>
      </div>
    </>
  );
};

export default LogoutBtn;
