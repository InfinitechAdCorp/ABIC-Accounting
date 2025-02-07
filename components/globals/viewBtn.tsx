"use client";

import React from "react";
import { Button } from "@heroui/react";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  link: string;
};

const ViewBtn = ({ title, link }: Props) => {
  const router = useRouter();

  return (
    <>
      <Button
        size="sm"
        color="primary"
        isIconOnly={true}
        title={title}
        onPress={() => router.push(link)}
      >
        <FaEye size={14} />
      </Button>
    </>
  );
};

export default ViewBtn;
