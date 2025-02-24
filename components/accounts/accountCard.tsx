"use client";

import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Account as Record } from "@prisma/client";
import { useRouter } from "next/navigation";
import { set } from "@/components/globals/auth";

type Props = {
  record: Record;
};

const AccountCard = ({ record }: Props) => {
  const router = useRouter();

  const onPress = async (e: any) => {
    const id = e.target.dataset.pressed;
    await set(id);
    router.push("/dashboard");
  };

  return (
    <>
      <Card
        className="mb-1"
        data-pressed={record.id}
        isHoverable
        isPressable
        onPress={onPress}
      >
        <CardBody className="flex items-center justify-center">
          <h3 className="text-sm md:text-xl font-bold">{record.name}</h3>
        </CardBody>
      </Card>
    </>
  );
};

export default AccountCard;
