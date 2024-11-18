"use client";

import React from "react";
import Link from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const Navbar = () => {
  return (
    <>
      <div className="flex gap-3 items-center bg-sky-600 p-5">
        <Link href="/">
          <h3 className="text-white font-semibold">Dashboard</h3>
        </Link>

        <Dropdown>
          <DropdownTrigger>
            <Button
              disableRipple
              className="p-0 bg-transparent data-[hover=true]:bg-transparent"
              variant="light"
            >
              <h3 className="text-white font-semibold text-base">
                Transaction Monitoring
              </h3>
            </Button>
          </DropdownTrigger>

          <DropdownMenu className="text-center bg-transparent">
            <DropdownItem>
              <Link href="/accounts">
                <h3 className="font-semibold">Accounts</h3>
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link href="/transactions">
                <h3 className="font-semibold">Transactions</h3>
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <DropdownTrigger>
            <Button
              disableRipple
              className="p-0 bg-transparent data-[hover=true]:bg-transparent"
              variant="light"
            >
              <h3 className="text-white font-semibold text-base">
                Contract Monitoring
              </h3>
            </Button>
          </DropdownTrigger>
          <DropdownMenu className="text-center">
            <DropdownItem>
              <Link href="/accounts">
                <h3 className="font-semibold">Clients</h3>
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link href="/contracts">
                <h3 className="font-semibold">Contracts</h3>
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};

export default Navbar;
