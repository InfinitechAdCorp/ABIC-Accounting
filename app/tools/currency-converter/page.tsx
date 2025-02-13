import React from "react";
import Navbar from "@/components/globals/navbar";
import { get as getAccount } from "@/components/accounts/actions";
import CurrencyConverterForm from "@/components/tools/currencyConverter/currencyConverterForm";

const CurrencyConverter = async () => {
  const { record: account } = await getAccount();

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
