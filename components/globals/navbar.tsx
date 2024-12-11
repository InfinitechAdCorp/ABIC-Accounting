"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (hrefs: string[]) => hrefs.includes(pathname);

  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <>
      <div className="flex gap-3 justify-evenly sm:justify-start items-center bg-sky-600 p-5">
        <Link href="/" className="text-center">
          <h3
            className={`text-sm md:text-base text-white cursor-pointer ${
              isActive(["/"]) ? "font-black" : "font-semibold"
            }`}
          >
            Dashboard
          </h3>
        </Link>

        <Dropdown
          classNames={{
            content: "min-w-0",
          }}
        >
          <DropdownTrigger className="text-center">
            <h3
              className={`text-sm md:text-base text-white cursor-pointer ${
                isActive(["/accounts", "/transactions"])
                  ? "font-black"
                  : "font-semibold"
              }`}
            >
              {width < 640 ? "Transactions" : "Transaction Monitoring"}
            </h3>
          </DropdownTrigger>

          <DropdownMenu className="text-center">
            <DropdownItem
              onClick={() => router.push("/accounts")}
              textValue="Accounts"
            >
              <h3 className="font-semibold">Accounts</h3>
            </DropdownItem>
            <DropdownItem
              onClick={() => router.push("/transactions")}
              textValue="Transactions"
            >
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
            <h3
              className={`text-sm md:text-base text-white cursor-pointer ${
                isActive(["/clients", "/contracts"])
                  ? "font-black"
                  : "font-semibold"
              }`}
            >
              {width < 640 ? "Contracts" : "Contract Monitoring"}
            </h3>
          </DropdownTrigger>
          <DropdownMenu className="text-center">
            <DropdownItem
              onClick={() => router.push("/clients")}
              textValue="Clients"
            >
              <h3 className="font-semibold">Clients</h3>
            </DropdownItem>
            <DropdownItem
              onClick={() => router.push("/contracts")}
              textValue="Contracts"
            >
              <h3 className="font-semibold">Contracts</h3>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
};

export default Navbar;
