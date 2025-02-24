"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  url: string;
};

const ViewBtn = ({ title, url }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onPress = () => {
    setIsLoading(true);
    router.push(url);
    setIsLoading(false);
  };

  return (
    <>
      <Button
        size="sm"
        color="primary"
        isIconOnly={true}
        title={title}
        isLoading={isLoading}
        onPress={onPress}
      >
        <FaEye size={14} />
      </Button>
    </>
  );
};

export default ViewBtn;
