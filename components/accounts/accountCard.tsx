"use client";

import React, { useState } from "react";
import { Card, CardBody } from "@heroui/react";
import { Account as Record } from "@prisma/client";
import { useRouter } from "next/navigation";
import { set } from "@/components/globals/auth";
import { Spinner } from "@heroui/react";

type Props = {
  record: Record;
};

const AccountCard = ({ record }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onPress = async (e: any) => {
    setIsLoading(true);
    
    const id = e.target.dataset.pressed;
    await set(id);
    router.push("/dashboard");
    
    setIsLoading(false);
  };

  return (
    <>
      <Card
        className="py-16 mb-1"
        data-pressed={record.id}
        isHoverable
        isPressable
        onPress={onPress}
      >
        <CardBody>
          <div className="flex items-center justify-center text-center h-[5rem]">
            {isLoading ? (
              <Spinner color="primary" />
            ) : (
              <h3 className="text-sm md:text-xl font-bold">{record.name}</h3>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default AccountCard;
