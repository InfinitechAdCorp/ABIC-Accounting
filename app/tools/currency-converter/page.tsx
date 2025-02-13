import React from "react";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
import CurrencyConverterForm from "@/components/tools/currencyConverter/currencyConverterForm";
import { retry } from "@/components/globals/serverUtils";

const CurrencyConverter = async () => {
  const { record: account } = await retry(getAccount);

  return (
    <>
      <Navbar record={account!} />

      <div className="flex justify-center items-center">
        <CurrencyConverterForm />
      </div>
    </>
  );
};

export default CurrencyConverter;
