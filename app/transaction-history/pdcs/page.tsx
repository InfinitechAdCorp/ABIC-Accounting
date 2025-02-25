import React from "react";
import { get as getAccount } from "@/components/accounts/actions";
import { retry } from "@/components/globals/serverUtils";
import Navbar from "@/components/globals/navbar";
import DataTable from "@/components/globals/dataTable";
import CreateModal from "@/components/pdcs/createModal";

const PDCs = async () => {
  const { record: account } = await retry(getAccount);

  return (
    <>
      <Navbar record={account!} />

      <CreateModal />
    </>
  );
};

export default PDCs;
