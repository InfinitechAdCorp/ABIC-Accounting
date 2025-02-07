"use client";

import React, { ReactElement } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@heroui/react";

type Props = {
  icon: ReactElement;
  model: string;
  url: string;
  count: number;
};

const CountCard = ({ icon, model, url, count }: Props) => {
  const router = useRouter();

  return (
    <>
      <Card
        className="cursor-pointer"
        title={`View ${model}`}
        isPressable
        isHoverable
        onPress={() => {
          router.push(url);
        }}
      >
        <CardBody className="grid grid-cols-1 lg:grid-cols-2 px-10 py-7 gap-3">
          <div className="flex justify-center items-center">
            {icon}
          </div>

          <div className="flex flex-col justify-center items-center">
            <h1 className="font-extrabold text-3xl">{count}</h1>
            <h4 className="text-neutral-500">{model}</h4>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CountCard;
