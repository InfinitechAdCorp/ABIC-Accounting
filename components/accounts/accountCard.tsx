"use client";

import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Account } from "@prisma/client";
import { useRouter } from "next/navigation";
import { set as setAccount } from "@/components/globals/auth";

type Props = {
  record: Account;
};

const AccountCard = ({ record }: Props) => {
  const router = useRouter();

  const set = async (e: any) => {
    const id = e.target.dataset.pressed;
    await setAccount(id);
    router.push("/dashboard");
  };

  return (
    <>
      <Card
        className="mb-1"
        data-pressed={record.id}
        isHoverable
        isPressable
        onPress={set}
      >
        <CardBody className="flex items-center justify-center h-60">
          <h3 className="text-sm md:text-xl font-bold">{record.name}</h3>
        </CardBody>
      </Card>
    </>
  );
};

export default AccountCard;
