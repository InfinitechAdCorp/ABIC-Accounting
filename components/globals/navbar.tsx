"use client";

import React from "react";
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
  const isServer = typeof window === "undefined";

  const isActive = (hrefs: string[]) => hrefs.includes(pathname);

  let isLoggedIn;
  if (!isServer) {
    isLoggedIn = sessionStorage.getItem("isLoggedIn");
  }

  const logout = () => {
    if (!isServer) {
      sessionStorage.clear();
    }
    toast.success("Logged Out");
  };

  return (
    <>
      {isLoggedIn == "true" ? (
        <div className="grid grid-cols-2 items-center bg-sky-600 p-5">
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
                  <span className="hidden lg:inline">
                    Transaction Monitoring
                  </span>
                  <span className="inline lg:hidden">Transactions</span>
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
                  <span className="hidden lg:inline">Contract Monitoring</span>
                  <span className="inline lg:hidden">Contracts</span>
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

          <div className="flex justify-end">
            <Link href="/" className="text-center">
              <h3
                className={"text-sm md:text-base text-white cursor-pointer"}
                onClick={logout}
              >
                Logout
              </h3>
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navbar;
