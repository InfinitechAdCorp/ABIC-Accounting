"use client";

import React, { useActionState } from "react";
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
import { addClient } from "@/components/contractMonitoring/clients/actions";
import { handleSubmit } from "@/components/globals/utils";
import Form from "next/form";

const AddClientModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [state, formAction, isPending] = useActionState(addClient, null);

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Client
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Form
                action={formAction}
              >
                <ModalHeader>Add Client</ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    size="md"
                    variant="bordered"
                    label="Name"
                    labelPlacement="outside"
                    placeholder="Enter Name"
                    name="name"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit" isLoading={isPending}>
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

export default AddClientModal;
