"use client";

import React from "react";
import { unset as unsetAccount } from "@/components/globals/auth";
import { useRouter } from "next/navigation";

const AccountsBtn = () => {
  const router = useRouter();

  const unset = async () => {
    await unsetAccount();
    router.push("/accounts");
  };

  return (
    <>
      <div className="text-center" onClick={unset}>
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
