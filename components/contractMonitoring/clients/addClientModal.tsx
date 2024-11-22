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
} from "@nextui-org/react";
import { addClient } from "./actions";
import { handleSubmit } from "@/components/globals/utils";
import Form from "next/form";

const AddClientModal = () => {
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
              <Form
                action={(formData) =>
                  handleSubmit(addClient, formData, onClose)
                }
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
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddClientModal;
