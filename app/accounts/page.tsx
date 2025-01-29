"use client";

import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { getAll } from "@/components/accounts/actions";
import Image from "next/image";
import { Prisma, Account } from "@prisma/client";

const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  return (
    <>
      <div className="grid grid-cols-2 items-center bg-[#0072F5] p-5">
        <div className="flex gap-1 items-center">
          <Image src={"/favicon.ico"} width={30} height={30} alt="logo" />
          <h3 className="text-sm md:text-base text-white font-semibold">
            ABIC Accounting
          </h3>
        </div>
      </div>

      <div className="m-5 md:mx-7 xl:mx-14 2xl:mx-60">
        <div className="text-center">
          <h1 className="font-bold text-2xl mb-5">Bank Accounts</h1>
        </div>
      </div>
    </>
  );
};

export default Accounts;
