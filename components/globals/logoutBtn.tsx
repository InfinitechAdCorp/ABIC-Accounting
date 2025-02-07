"use client";

import React from "react";
import toast from "react-hot-toast";
import { logout } from "@/components/globals/auth";
import { useRouter } from "next/navigation";

const LogoutBtn = () => {
  const router = useRouter();

  const onClick = async () => {
    const response = await logout();
    toast.success(response.message)
    router.push("/")
  };

  return (
    <>
      <div className="text-center" onClick={onClick}>
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
