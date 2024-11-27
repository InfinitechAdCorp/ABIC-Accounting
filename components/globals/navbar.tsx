"use client";

import React from "react";
import Link from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex gap-3 items-center bg-sky-600 p-5">
        <Link href="/" className="text-center">
          <h3 className="text-white font-semibold">Dashboard</h3>
        </Link>

        <Dropdown
          classNames={{
            content: "min-w-0",
          }}
        >
          <DropdownTrigger className="text-center">
            <h3 className="text-white font-semibold cursor-pointer">
              Transaction Monitoring
            </h3>
          </DropdownTrigger>

          <DropdownMenu className="text-center">
            <DropdownItem onClick={() => router.push("/accounts")} textValue="Accounts">
              <h3 className="font-semibold">Accounts</h3>
            </DropdownItem>
            <DropdownItem onClick={() => router.push("/transactions")} textValue="Transactions">
              <h3 className="font-semibold">Transactions</h3>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown
          classNames={{
            content: "min-w-0",
          }}
        >
          <DropdownTrigger className="text-center">
            <h3 className="text-white font-semibold cursor-pointer">
              Contract Monitoring
            </h3>
          </DropdownTrigger>
          <DropdownMenu className="text-center">
            <DropdownItem onClick={() => router.push("/clients")} textValue="Clients">
              <h3 className="font-semibold">Clients</h3>
            </DropdownItem>
            <DropdownItem onClick={() => router.push("/contracts")} textValue="Contracts">
              <h3 className="font-semibold">Contracts</h3>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};

export default Navbar;
