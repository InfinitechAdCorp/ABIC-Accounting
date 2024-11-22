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
import { handleSubmit } from "@/components/globals/utils";
import Form from "next/form";

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
              <Form
                action={(formData) =>
                  handleSubmit(addTransaction, formData, onClose)
                }
              >
                <ModalHeader>Add Transaction</ModalHeader>
                <ModalBody>
                  <DatePicker
                    size="md"
                    variant="bordered"
                    label="Voucher Date"
                    labelPlacement="outside"
                    name="date"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="text"
                      size="md"
                      variant="bordered"
                      label="Voucher Number"
                      labelPlacement="outside"
                      placeholder="Enter Voucher Number"
                      name="voucher"
                    />

                    <Input
                      type="text"
                      size="md"
                      variant="bordered"
                      label="Check Number"
                      labelPlacement="outside"
                      placeholder="Enter Check Number"
                      name="check"
                    />
                  </div>

                  <Select
                    size="md"
                    variant="bordered"
                    label="Account"
                    labelPlacement="outside"
                    placeholder="Select Account"
                    name="account_id"
                    items={accounts}
                  >
                    {(account) => (
                      <SelectItem key={account.id}>{account.name}</SelectItem>
                    )}
                  </Select>

                  <Textarea
                    size="md"
                    variant="bordered"
                    label="Particulars"
                    labelPlacement="outside"
                    placeholder="Enter Particulars"
                    name="particulars"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      size="md"
                      variant="bordered"
                      label="Type"
                      labelPlacement="outside"
                      placeholder="Select Type"
                      name="type"
                    >
                      <SelectItem key="Credit">Credit</SelectItem>
                      <SelectItem key="Debit">Debit</SelectItem>
                    </Select>

                    <Input
                      type="number"
                      size="md"
                      variant="bordered"
                      label="Amount"
                      labelPlacement="outside"
                      placeholder="Enter Amount"
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
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTransactionModal;
