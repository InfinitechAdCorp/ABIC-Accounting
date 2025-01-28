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
import { toast } from "react-toastify";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const isActive = (hrefs: string[]) => hrefs.includes(pathname);

  const logout = () => {
    setIsLoggedIn(false)
    toast.success("Logged Out");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      sessionStorage.clear();
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className="grid grid-cols-2 items-center bg-[#0072F5] p-5">
        <div className="flex justify-evenly sm:justify-start gap-3">
          <Link href="/dashboard" className="text-center">
            <h3
              className={`text-sm md:text-base text-white cursor-pointer ${
                isActive(["/dashboard"]) ? "font-black" : "font-semibold"
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
                <span className="hidden lg:inline">Transaction Monitoring</span>
                <span className="inline lg:hidden">Transactions</span>
              </h3>
            </DropdownTrigger>

            <DropdownMenu className="text-center">
              <DropdownItem
                onPress={() => router.push("/accounts")}
                key="Accounts"
              >
                <h3 className="font-semibold">Accounts</h3>
              </DropdownItem>
              <DropdownItem
                onPress={() => router.push("/transactions")}
                key="Transactions"
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
                <span className="hidden lg:inline">Contract Monitoring</span>
                <span className="inline lg:hidden">Contracts</span>
              </h3>
            </DropdownTrigger>
            <DropdownMenu className="text-center">
              <DropdownItem
                onPress={() => router.push("/clients")}
                key="Clients"
              >
                <h3 className="font-semibold">Clients</h3>
              </DropdownItem>
              <DropdownItem
                onPress={() => router.push("/contracts")}
                key="Contracts"
              >
                <h3 className="font-semibold">Contracts</h3>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="flex justify-end">
          <Link href="/" className="text-center">
            <h3
              className={"text-sm md:text-base font-semibold text-white cursor-pointer"}
              onClick={logout}
            >
              Logout
            </h3>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
