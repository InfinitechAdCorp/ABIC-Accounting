"use client";

import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { getAll } from "@/components/accounts/actions";
import Image from "next/image";
import { Account } from "@prisma/client";
import CreateModal from "@/components/accounts/createModal";

const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const response = await getAll();
      console.log(response);
      setAccounts(response.accounts);
    };

    fetchAccounts();
  }, []);

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

          <div className="grid grid-cols-4 gap-5">
            <CreateModal />
            {accounts.map((account) => (
              <Card className="mb-3" key={account.id}>
                <CardBody className="flex items-center justify-center h-60">
                  <h3 className="text-sm md:text-xl font-bold">
                    {account.name}
                  </h3>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;
