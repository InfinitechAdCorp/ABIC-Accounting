import React, { useState } from "react";
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
import { updateTransaction } from "@/components/transactionMonitoring/transactions/actions";
import {
  FormattedTransaction,
  FormattedAccount,
} from "@/components/transactionMonitoring/types";
import { ActionResponse } from "@/components/globals/types";
import { parseDate } from "@internationalized/date";

interface Props {
  onSubmit: (
    action: (formData: FormData) => Promise<ActionResponse>,
    formData: FormData,
    onClose: () => void
  ) => void;
  transaction: FormattedTransaction;
  accounts: FormattedAccount[];
}

const EditTransactionModal = ({ onSubmit, transaction, accounts }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [transactionData, setTransactionData] = useState(transaction);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setTransactionData({ ...transactionData, [name]: value });
  };

  const formatDate = (date: Date) => {
    if (date) {
      const localeDate = date.toLocaleDateString("en-CA");
      const formattedDate = parseDate(localeDate);
      return formattedDate;
    }
  };

  return (
    <>
      <Button size="sm" color="primary" onPress={onOpen}>
        Edit
      </Button>

      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form
                action={(formData) =>
                  onSubmit(updateTransaction, formData, onClose)
                }
              >
                <ModalHeader>Edit Transaction</ModalHeader>
                <ModalBody>
                  <input type="hidden" value={transactionData.id} name="id" />

                  <DatePicker
                    size="sm"
                    variant="bordered"
                    label="Voucher Date"
                    name="date"
                    defaultValue={formatDate(transactionData.date)}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="text"
                      size="sm"
                      variant="bordered"
                      label="Voucher Number"
                      name="voucher"
                      value={transactionData.voucher}
                      onChange={(e) => handleChange(e)}
                    />

                    <Input
                      type="text"
                      size="sm"
                      variant="bordered"
                      label="Check Number"
                      name="check"
                      value={transactionData.check}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <Select
                    size="sm"
                    variant="bordered"
                    label="Account"
                    name="account_id"
                    items={accounts}
                    defaultSelectedKeys={[transactionData.account_id as string]}
                    onChange={(e) => handleChange(e)}
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
                    value={transactionData.particulars}
                    onChange={(e) => handleChange(e)}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      size="sm"
                      variant="bordered"
                      label="Type"
                      name="type"
                      defaultSelectedKeys={[transactionData.type as string]}
                      onChange={(e) => handleChange(e)}
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
                      value={transactionData.amount.toString()}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit">
                    Update
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

export default EditTransactionModal;
