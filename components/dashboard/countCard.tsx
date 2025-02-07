"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@heroui/react";

type Props = {
  Icon: React.ReactElement;
  model: string;
  link: string;
  count: number;
};

const CountCard = ({ Icon, model, link, count }: Props) => {
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
            <Icon.type {...Icon.props} />
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
