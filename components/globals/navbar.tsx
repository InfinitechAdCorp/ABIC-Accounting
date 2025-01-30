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
import toast from "react-hot-toast";
import { Account } from "@prisma/client";
import { get } from "@/components/accounts/actions";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [accountID, setAccountID] = useState("");
  const [account, setAccount] = useState<Account| null>();

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

  useEffect(() => {
    setAccountID(sessionStorage.getItem("accountID") as string);
  }, []);

  useEffect(() => {
    if (accountID) {
      const fetchAccount = async () => {
        const response = await get(accountID);
        setAccount(response.account);
      };

      fetchAccount();
    }
  }, [accountID]);

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

          {account?.transaction_history_access && (
            <Dropdown
              classNames={{
                content: "min-w-0",
              }}
            >
              <DropdownTrigger className="text-center">
                <h3
                  className={`text-sm md:text-base text-white cursor-pointer ${
                    isActive(["/transaction-clients", "/transactions"])
                      ? "font-black"
                      : "font-semibold"
                  }`}
                >
                  <span className="hidden lg:inline">Transaction History</span>
                  <span className="inline lg:hidden">Transactions</span>
                </h3>
              </DropdownTrigger>

              <DropdownMenu className="text-center">
                <DropdownItem
                  onPress={() => router.push("/transaction-clients")}
                  key="Transaction Clients"
                >
                  <h3 className="font-semibold">Clients</h3>
                </DropdownItem>
                <DropdownItem
                  onPress={() => router.push("/transactions")}
                  key="Transactions"
                >
                  <h3 className="font-semibold">Transactions</h3>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}

          {account?.collection_monitoring_access && (
            <Dropdown
              classNames={{
                content: "min-w-0",
              }}
            >
              <DropdownTrigger className="text-center">
                <h3
                  className={`text-sm md:text-base text-white cursor-pointer ${
                    isActive(["/collection-clients", "/collections"])
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
                  onPress={() => router.push("/collection-clients")}
                  key="Collection Clients"
                >
                  <h3 className="font-semibold">Clients</h3>
                </DropdownItem>
                <DropdownItem
                  onPress={() => router.push("/collections")}
                  key="Collections"
                >
                  <h3 className="font-semibold">Collections</h3>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
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
        <h3 className="font-semibold">Loan Calculator</h3>
      </DropdownItem>
      <DropdownItem onPress={() => router.push("/currencyconverter")} key="CurrencyConverter">
        <h3 className="font-semibold">Currency Converter</h3>
      </DropdownItem>
      <DropdownItem onPress={() => router.push("/taxcomputation")} key="TaxComputation">
        <h3 className="font-semibold">Tax Computation</h3>
      </DropdownItem>
      <DropdownItem onPress={() => router.push("/acknowledgementreceipt")} key="AcknowledgementReceipt">
        <h3 className="font-semibold">Acknowledgement</h3>
      </DropdownItem>
      <DropdownItem onPress={() => router.push("/billingstatement")} key="BillingStatement">
        <h3 className="font-semibold">Billing Statement</h3>
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
  <Link href="/" className="text-end">
            <h3
              className={
                "text-sm md:text-base font-semibold text-white cursor-pointer"
              }
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
