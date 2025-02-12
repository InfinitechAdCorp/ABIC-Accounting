import React from "react";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
import { Account } from "@prisma/client";
import TaxComputationForm from "@/components/tools/taxComputation/taxComputationForm";

const TaxComputation = async () => {
  const { record: account } = await getAccount();

  return (
    <>
      <Navbar record={account as Account} />

      <div className="flex justify-center items-center">
        <TaxComputationForm />
      </div>
    </>
  );
};

export default TaxComputation;