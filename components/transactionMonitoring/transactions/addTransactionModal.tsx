"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  DatePicker,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { addTransaction } from "@/components/transactionMonitoring/transactions/actions";
import { FormattedAccount } from "@/components/transactionMonitoring/types";
import { handleSubmit } from "@/components/globals/functions";

interface Props {
  accounts: FormattedAccount[];
}

const AddTransactionModal = ({ accounts }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Transaction
      </Button>

      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form
                action={(formData) =>
                  handleSubmit(addTransaction, formData, onClose)
                }
              >
                <ModalHeader>Add Transaction</ModalHeader>
                <ModalBody>
                  <DatePicker
                    size="sm"
                    variant="bordered"
                    label="Voucher Date"
                    name="date"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="text"
                      size="sm"
                      variant="bordered"
                      label="Voucher Number"
                      name="voucher"
                    />

                    <Input
                      type="text"
                      size="sm"
                      variant="bordered"
                      label="Check Number"
                      name="check"
                    />
                  </div>

                  <Select
                    size="sm"
                    variant="bordered"
                    label="Account"
                    name="account_id"
                    items={accounts}
                  >
                    {(account) => (
                      <SelectItem key={account.id}>{account.name}</SelectItem>
                    )}
                  </Select>

                  <Textarea
                    size="sm"
                    variant="bordered"
                    label="Particulars"
                    name="particulars"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      size="sm"
                      variant="bordered"
                      label="Type"
                      name="type"
                    >
                      <SelectItem key="Credit">Credit</SelectItem>
                      <SelectItem key="Debit">Debit</SelectItem>
                    </Select>

                    <Input
                      type="number"
                      size="sm"
                      variant="bordered"
                      label="Amount"
                      name="amount"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit">
                    Save
                  </Button>
                  <Button color="danger" onPress={onClose}>
                    Cancel
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTransactionModal;
