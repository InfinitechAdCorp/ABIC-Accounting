import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { ActionResponse } from "@/components/contractMonitoring/types";
import { deleteClient } from "./actions";

interface Props {
  onSubmit: (
    action: (formData: FormData) => Promise<ActionResponse>,
    formData: FormData,
    onClose: () => void
  ) => void;
  id: string;
}

const DeleteClientModal = ({ onSubmit, id }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button size="sm" color="danger" onPress={onOpen}>
        Delete
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form
                action={(formData) => onSubmit(deleteClient, formData, onClose)}
              >
                <ModalHeader>Delete Client</ModalHeader>
                <ModalBody>
                  <input type="hidden" value={id} name="id" />
                  <h6>Are you sure that you want to delete this client?</h6>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit">
                    Yes
                  </Button>
                  <Button color="danger" onPress={onClose}>
                    No
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

export default DeleteClientModal;
