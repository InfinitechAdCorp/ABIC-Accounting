"use client";

import React from "react";
import AddAccountModal from "@/components/transactionMonitoring/accounts/addAccountModal";
import AddTransactionModal from "@/components/transactionMonitoring/transactions/addTransactionModal";
import { toast } from "react-toastify";
import { FormattedAccount, ActionResponse } from "@/components/transactionMonitoring/types";

type Props = {
    accounts: FormattedAccount[],
}

const HeaderButtons = ({ accounts }: Props) => {
  const handleSubmit = (
    action: (formData: FormData) => Promise<ActionResponse>,
    formData: FormData,
    onClose: () => void,
  ) => {
    action(formData).then((response) => handlePostSubmit(response, onClose));
  };

  const handlePostSubmit = (response: ActionResponse, onClose: () => void) => {
    if (response.code == 200) {
      toast.success(response.message);
      onClose()
    } else {
      if (response.code == 429) {
        console.log(response.errors);
      }
      toast.error(response.message);
    }
  };

  return (
    <>
      <AddAccountModal onSubmit={handleSubmit} />
      <AddTransactionModal onSubmit={handleSubmit} accounts={accounts} />
    </>
  );
};

export default HeaderButtons;
