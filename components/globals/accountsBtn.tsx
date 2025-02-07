"use client";

import React from "react";
import { unset } from "@/components/globals/auth";
import { useRouter } from "next/navigation";

const AccountsBtn = () => {
  const router = useRouter();

  const onClick = async () => {
    await unset();
    router.push("/accounts");
  };

  return (
    <>
      <div className="text-center" onClick={onClick}>
        <h3
          className={
            "text-sm md:text-base font-semibold text-white cursor-pointer"
          }
        >
          Accounts
        </h3>
      </div>
    </>
  );
};
export default AccountsBtn;
