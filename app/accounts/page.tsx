import React from "react";
import { getAccounts } from "@/components/transactionMonitoring/accounts/actions";
// import AccountRow from "@/components/transactionMonitoring/accounts/accountRow";
// import HeaderButtons from "@/components/transactionMonitoring/accounts/headerButtons";

const Accounts = async () => {
  const { accounts } = await getAccounts();
  console.log("🚀 ~ Accounts ~ accounts:", accounts)
  return <></>;
};

export default Accounts;
