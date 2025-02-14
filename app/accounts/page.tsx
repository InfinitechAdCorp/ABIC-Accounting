import React from "react";
import { getAll } from "@/components/accounts/actions";
import Image from "next/image";
import LogoutBtn from "@/components/globals/logoutBtn";
import CreateModal from "@/components/accounts/createModal";
import AccountCard from "@/components/accounts/accountCard";
import { retry } from "@/components/globals/serverUtils";
import { Account } from "@prisma/client";

const Accounts = async () => {
  const { records }: { records?: Account[] } = await retry(getAll);

  return (
    <>
      <div className="grid grid-cols-2 items-center bg-[#0072F5] p-5">
        <div className="flex gap-1 items-center">
          <Image src={"/favicon.ico"} width={30} height={30} alt="logo" />
          <h3 className="text-sm md:text-base text-white font-semibold">
            ABIC Accounting
          </h3>
        </div>

        <div className="flex justify-end items-center">
          <LogoutBtn />
        </div>
      </div>

      <div className="m-5 md:mx-7 xl:mx-14 2xl:mx-60">
        <div className="text-center">
          <h1 className="font-bold text-2xl mb-5">BANK ACCOUNTS</h1>

          <div className="grid grid-cols-4 gap-5">
            <CreateModal />
            {records!.map((record) => (
              <AccountCard key={record.id} record={record} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Accounts;
