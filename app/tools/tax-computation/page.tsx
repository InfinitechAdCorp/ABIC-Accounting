import React from "react";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
import TaxComputationForm from "@/components/tools/taxComputation/taxComputationForm";
import HeroForm from "@/components/tools/taxComputation/heroForm";
import { retry } from "@/components/globals/serverUtils";

const TaxComputation = async () => {
  const { record: account } = await retry(getAccount);

  return (
    <>
      <Navbar record={account!} />

      <div>
        {/* <div className="flex justify-center">
          <TaxComputationForm />
        </div> */}

        <div className="flex justify-center">
          <HeroForm />
        </div>
      </div>
    </>
  );
};

export default TaxComputation;
