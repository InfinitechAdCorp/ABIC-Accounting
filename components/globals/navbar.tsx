"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";
import LogoutBtn from "@/components/globals/logoutBtn";
import AccountsBtn from "@/components/globals/accountsBtn";
import { Account as Record } from "@prisma/client";
import { get } from "@/components/accounts/actions";

const Navbar = () => {
  const [record, setRecord] = useState<Record>();

  const router = useRouter();
  const pathname = usePathname();

  const isActive = (url: string) => pathname.startsWith(url);

  useEffect(() => {
    const fetchRecord = async () => {
      const response = await get();
      if (response.record) {
        setRecord(response.record);
      }
    };

    setTimeout(() => {
      if (!record) {
        fetchRecord();
      }
    }, 500);
  }, [record]);

  return (
    <>
      <div
        className="grid grid-cols-2 items-center bg-[#0072F5] p-5"
        id="navbar"
      >
        <div className="flex justify-evenly sm:justify-start gap-3 items-center">
          {record && (
            <>
              <Link href="/dashboard" className="text-center">
                <h3 className="text-base md:text-lg text-white cursor-pointer font-semibold">
                  {record?.name}
                </h3>
              </Link>

              <Link href="/dashboard" className="text-center">
                <h3
                  className={`text-sm md:text-base text-white cursor-pointer ${
                    isActive("/dashboard") ? "font-black" : "font-semibold"
                  }`}
                >
                  Dashboard
                </h3>
              </Link>

              <Link href="/listings" className="text-center">
                <h3
                  className={`text-sm md:text-base text-white cursor-pointer ${
                    isActive("/listings") ? "font-black" : "font-semibold"
                  }`}
                >
                  Listings
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
                      isActive("/transaction-history")
                        ? "font-black"
                        : "font-semibold"
                    }`}
                  >
                    <span className="hidden lg:inline">
                      Transaction History
                    </span>
                    <span className="inline lg:hidden">Transactions</span>
                  </h3>
                </DropdownTrigger>

                <DropdownMenu className="text-center">
                  <DropdownItem
                    onPress={() => router.push("/transaction-history/clients")}
                    key="Clients"
                    textValue="Clients"
                  >
                    <h3 className="font-semibold">Clients</h3>
                  </DropdownItem>
                  <DropdownItem
                    onPress={() =>
                      router.push("/transaction-history/transactions")
                    }
                    key="Transactions"
                    textValue="Transactions"
                  >
                    <h3 className="font-semibold">Transactions</h3>
                  </DropdownItem>
                  <DropdownItem
                    onPress={() => router.push("/transaction-history/pdc-sets")}
                    key="PDCs"
                    textValue="PDCs"
                  >
                    <h3 className="font-semibold">PDCs</h3>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              {record.cm_access && (
                <Dropdown
                  classNames={{
                    content: "min-w-0",
                  }}
                >
                  <DropdownTrigger className="text-center">
                    <h3
                      className={`text-sm md:text-base text-white cursor-pointer ${
                        isActive("/collection-monitoring")
                          ? "font-black"
                          : "font-semibold"
                      }`}
                    >
                      <span className="hidden lg:inline">
                        Collection Monitoring
                      </span>
                      <span className="inline lg:hidden">Collections</span>
                    </h3>
                  </DropdownTrigger>
                  <DropdownMenu className="text-center">
                    <DropdownItem
                      onPress={() => {
                        router.push("/collection-monitoring/clients");
                      }}
                      key="Clients"
                      textValue="Clients"
                    >
                      <h3 className="font-semibold">Clients</h3>
                    </DropdownItem>
                    <DropdownItem
                      onPress={() =>
                        router.push("/collection-monitoring/collections")
                      }
                      key="Collections"
                      textValue="Collections"
                    >
                      <h3 className="font-semibold">Collections</h3>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Dropdown classNames={{ content: "min-w-0" }}>
            <DropdownTrigger className="text-center">
              <h3
                className={`text-sm md:text-base text-white cursor-pointer ${
                  isActive("/tools") ? "font-black" : "font-semibold"
                }`}
              >
                <span className="hidden lg:inline">Tools</span>
                <span className="inline lg:hidden">More</span>
              </h3>
            </DropdownTrigger>
            <DropdownMenu className="text-center">
              <DropdownItem
                onPress={() => router.push("/tools/loan-calculator")}
                key="Loan Calculator"
              >
                <h3 className="font-semibold">Loan Calculator</h3>
              </DropdownItem>
              <DropdownItem
                onPress={() => router.push("/tools/currency-converter")}
                key="Currency Converter"
              >
                <h3 className="font-semibold">Currency Converter</h3>
              </DropdownItem>
              <DropdownItem
                onPress={() => router.push("/tools/tax-calculator")}
                key="Tax Calculator"
              >
                <h3 className="font-semibold">Tax Calculator</h3>
              </DropdownItem>
              <DropdownItem
                onPress={() => router.push("/tools/acknowledgement-receipt")}
                key="Acknowledgement Receipt"
              >
                <h3 className="font-semibold">Acknowledgement Receipt</h3>
              </DropdownItem>
              <DropdownItem
                onPress={() => router.push("/tools/billing-statement")}
                key="Billing Statement"
              >
                <h3 className="font-semibold">Billing Statement</h3>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <AccountsBtn />
          <LogoutBtn />
        </div>
      </div>
    </>
  );
};

export default Navbar;
