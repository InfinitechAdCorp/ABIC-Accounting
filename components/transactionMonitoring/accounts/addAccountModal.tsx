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
} from "@nextui-org/react";
import { ActionResponse } from "@/components/transactionMonitoring/types";
import { addAccount } from "./actions";

interface Props {
  onSubmit: (
    action: (formData: FormData) => Promise<ActionResponse>,
    formData: FormData,
    onClose: () => void
  ) => void;
}

const AddAccountModal = ({ onSubmit }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Account
      </Button>
      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form
                action={(formData) => onSubmit(addAccount, formData, onClose)}
              >
                <ModalHeader>Add Account</ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    label="Name"
                    name="name"
                    variant="bordered"
                  />
                  <Input
                    type="number"
                    label="Starting Balance"
                    name="balance"
                    variant="bordered"
                  />
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

export default AddAccountModal;
