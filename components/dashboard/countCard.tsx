"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@nextui-org/react";

type Props = {
  model: string;
  link: string;
  count: number;
  children: React.ReactNode,
};

const CountCard = ({ model, link, count, children }: Props) => {
  const router = useRouter();

  return (
    <>
      <Card
        className="cursor-pointer"
        title={`View ${model}`}
        isPressable
        isHoverable
        onPress={() => {
          router.push(link);
        }}
      >
        <CardBody className="grid grid-cols-1 lg:grid-cols-2 px-10 py-7 gap-3">
          <div className="flex justify-center items-center">
            {children}
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
