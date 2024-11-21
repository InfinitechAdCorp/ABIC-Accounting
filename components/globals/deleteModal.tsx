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
} from "@nextui-org/react";
import { ActionResponse } from "@/components/globals/types";
import { handleSubmit } from "./utils";
// import { deleteClient } from "./actions";

interface Props {
  title: string;
  action: (formData: FormData) => Promise<ActionResponse>;
  id: string;
}

const DeleteModal = ({ title, action, id }: Props) => {
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
                action={(formData) => handleSubmit(action, formData, onClose)}
              >
                <ModalHeader>Delete {title}</ModalHeader>
                <ModalBody>
                  <input type="hidden" value={id} name="id" />
                  <h6>Are you sure that you want to delete this {title}?</h6>
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

export default DeleteModal;
