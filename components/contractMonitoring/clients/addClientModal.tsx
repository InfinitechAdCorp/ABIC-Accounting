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
import { ActionResponse } from "@/components/contractMonitoring/types";
import { addClient } from "./actions";

interface Props {
  onSubmit: (
    action: (formData: FormData) => Promise<ActionResponse>,
    formData: FormData,
    onClose: () => void
  ) => void;
}

const AddClientModal = ({ onSubmit }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Client
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form
                action={(formData) => onSubmit(addClient, formData, onClose)}
              >
                <ModalHeader>Add Client</ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    label="Name"
                    name="name"
                    variant="bordered"
                    size="sm"
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

export default AddClientModal;
