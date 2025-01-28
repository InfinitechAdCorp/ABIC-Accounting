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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faFileAlt, faUser, faCalculator, faDollarSign, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const isActive = (hrefs: string[]) => hrefs.includes(pathname);

  const logout = () => {
    setIsLoggedIn(false);
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
              className={`text-sm md:text-base text-white cursor-pointer ${isActive(["/dashboard"]) ? "font-black" : "font-semibold"}`}
            >
              Dashboard
            </h3>
          </Link>

          <Dropdown classNames={{ content: "min-w-0" }}>
            <DropdownTrigger className="text-center">
              <h3 className={`text-sm md:text-base text-white cursor-pointer ${isActive(["/accounts", "/transactions"]) ? "font-black" : "font-semibold"}`}>
                <span className="hidden lg:inline">Transaction Monitoring</span>
                <span className="inline lg:hidden">Transactions</span>
              </h3>
            </DropdownTrigger>
            <DropdownMenu className="text-center">
              <DropdownItem onPress={() => router.push("/accounts")} key="Accounts">
                <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                <h3 className="font-semibold">Accounts</h3>
              </DropdownItem>
              <DropdownItem onPress={() => router.push("/transactions")} key="Transactions">
                <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                <h3 className="font-semibold">Transactions</h3>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown classNames={{ content: "min-w-0" }}>
            <DropdownTrigger className="text-center">
              <h3 className={`text-sm md:text-base text-white cursor-pointer ${isActive(["/clients", "/contracts"]) ? "font-black" : "font-semibold"}`}>
                <span className="hidden lg:inline">Contract Monitoring</span>
                <span className="inline lg:hidden">Contracts</span>
              </h3>
            </DropdownTrigger>
            <DropdownMenu className="text-center">
              <DropdownItem onPress={() => router.push("/clients")} key="Clients">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                <h3 className="font-semibold">Clients</h3>
              </DropdownItem>
              <DropdownItem onPress={() => router.push("/contracts")} key="Contracts">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                <h3 className="font-semibold">Contracts</h3>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="flex justify-end gap-4">
          <Dropdown classNames={{ content: "min-w-0" }}>
            <DropdownTrigger className="text-center">
              <h3 className={`text-sm md:text-base text-white cursor-pointer ${isActive(["/loancalculator", "/currencyconverter", "/taxcomputation"]) ? "font-black" : "font-semibold"}`}>
                <span className="hidden lg:inline">Tools</span>
                <span className="inline lg:hidden">More</span>
              </h3>
            </DropdownTrigger>
            <DropdownMenu className="text-center">
              <DropdownItem onPress={() => router.push("/loancalculator")} key="LoanCalculator">
                <FontAwesomeIcon icon={faCalculator} className="mr-2" />
                <h3 className="font-semibold">Loan Calculator</h3>
              </DropdownItem>
              <DropdownItem onPress={() => router.push("/currencyconverter")} key="CurrencyConverter">
                <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                <h3 className="font-semibold">Currency Converter</h3>
              </DropdownItem>
              <DropdownItem onPress={() => router.push("/taxcomputation")} key="TaxComputation">
                <FontAwesomeIcon icon={faCalculator} className="mr-2" />
                <h3 className="font-semibold">Tax Computation</h3>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Link href="/" className="text-center">
            <h3 className="text-sm md:text-base font-semibold text-white cursor-pointer" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </h3>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
