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
} from "@nextui-org/react";
import { FormattedAccount } from "@/components/transactionMonitoring/types";
import { ActionResponse } from "@/components/globals/types";
import { updateAccount } from "@/components/transactionMonitoring/accounts/actions";
import Form from "next/form";

interface Props {
  onSubmit: (
    action: (formData: FormData) => Promise<ActionResponse>,
    formData: FormData,
    onClose: () => void
  ) => void;
  account: FormattedAccount;
}

const EditAccountModal = ({ onSubmit, account }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [accountData, setAccountData] = useState(account);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setAccountData({ ...accountData, [name]: value });
  };

  return (
    <>
      <Button size="sm" color="primary" onPress={onOpen}>
        Edit
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Form
                action={(formData) =>
                  onSubmit(updateAccount, formData, onClose)
                }
              >
                <ModalHeader>Edit Account</ModalHeader>
                <ModalBody>
                  <input type="hidden" value={accountData.id} name="id" />

                  <Input
                    type="text"
                    size="md"
                    variant="bordered"
                    label="Name"
                    labelPlacement="outside"
                    placeholder="Enter Name"
                    name="name"
                    value={accountData.name}
                    onChange={handleChange}
                  />
                  <Input
                    type="number"
                    label="Starting Balance"
                    labelPlacement="outside"
                    placeholder="Enter Starting Balance"
                    name="balance"
                    variant="bordered"
                    size="md"
                    value={accountData.balance.toString()}
                    onChange={handleChange}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit">
                    Update
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

export default EditAccountModal;
