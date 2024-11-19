"use client";

import React from "react";
import AddClientModal from "@/components/contractMonitoring/clients/addClientModal";
import { toast } from "react-toastify";
import { ActionResponse } from "@/components/contractMonitoring/types";

const HeaderButtons = () => {
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
      <AddClientModal onSubmit={handleSubmit} />
    </>
  );
};

export default HeaderButtons;
