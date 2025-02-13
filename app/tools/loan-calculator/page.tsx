import React from "react";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
import LoanCalculatorForm from "@/components/tools/loanCalculator/loanCalculatorForm";
import { retry } from "@/components/globals/serverUtils";

const LoanCalculator = async () => {
  const { record: account } = await retry(getAccount);

  return (
    <>
      <Navbar record={account!} />

      <div className="flex justify-center items-center">
        <LoanCalculatorForm />
      </div>
    </>
  );
};

export default LoanCalculator;
