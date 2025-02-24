import React from "react";
import { getAll } from "@/components/accounts/actions";
import Image from "next/image";
import LogoutBtn from "@/components/globals/logoutBtn";
import CreateModal from "@/components/accounts/createModal";
import AccountCard from "@/components/accounts/accountCard";
import { retry } from "@/components/globals/serverUtils";
import { Account } from "@prisma/client";
import { Card, CardBody } from "@heroui/react";

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

      <div className="max-h-[93vh]">
        <Card radius="none" className="py-[0.10rem] px-2">
          <CardBody>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Bank Accounts</h3>
            </div>
          </CardBody>
        </Card>

        <Card className="m-5 md:my-7 md:mx-96 py-3 px-5">
          <CardBody>
            <div className="grid grid-cols-4 gap-5">
              <CreateModal />
              {records &&
                records.map((record) => (
                  <AccountCard key={record.id} record={record} />
                ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Accounts;
