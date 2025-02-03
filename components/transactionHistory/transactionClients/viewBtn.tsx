"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

const ViewBtn = ({ id }: Props) => {
  const router = useRouter();

  return (
    <>
      <Button
        size="sm"
        color="primary"
        isIconOnly={true}
        title="View Transactions"
        onPress={() =>
          router.push(`/transaction-history/transaction-clients/${id}`)
        }
      >
        <FaEye size={14} />
      </Button>
    </>
  );
};

export default ViewBtn;
