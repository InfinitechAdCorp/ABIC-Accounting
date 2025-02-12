import React from "react";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
import { Account } from "@prisma/client";
import LoanCalculatorForm from "@/components/tools/loanCalculator/loanCalculatorForm";

const LoanCalculator = async () => {
  const { record: account } = await getAccount();

  return (
    <>
      <Navbar record={account as Account} />

      <div className="flex justify-center items-center">
        <LoanCalculatorForm />
      </div>
    </>
  );
};

export default LoanCalculator;
