"use client";

import React from "react";
import AddAccountModal from "@/components/transactionMonitoring/accounts/addAccountModal";
import { toast } from "react-toastify";
import { ActionResponse } from "@/components/transactionMonitoring/types";

const HeaderButtons = () => {
  const handleSubmit = (
    formData: FormData,
    action: (formData: FormData) => Promise<ActionResponse>
  ) => {
    action(formData).then((response) => handlePostSubmit(response));
  };

  const handlePostSubmit = (response: ActionResponse) => {
    if (response.code == 200) {
      toast.success(response.message);
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
    </>
  );
};

export default HeaderButtons;
