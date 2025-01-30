"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Account } from "@prisma/client";
import { useRouter } from "next/navigation";

type Props = {
  account: Account;
};

const AccountCard = ({ account }: Props) => {
  const router = useRouter();

  const setAccount = (e: any) => {
    const account_id = e.target.dataset.pressed;
    sessionStorage.setItem("accountID", account_id);
    router.push("/dashboard");
  };

  return (
    <>
      <Card
        className="mb-1"
        data-pressed={account.id}
        isHoverable
        isPressable
        onPress={setAccount}
      >
        <CardBody className="flex items-center justify-center h-60">
          <h3 className="text-sm md:text-xl font-bold">{account.name}</h3>
        </CardBody>
      </Card>
    </>
  );
};

export default AccountCard;
