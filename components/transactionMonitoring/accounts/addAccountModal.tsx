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
import { addAccount } from "./actions";
import { handleSubmit } from "@/components/globals/utils";
import Form from "next/form";
import { PlusIcon } from "@/components/globals/icons";

const AddAccountModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onPress={onOpen} endContent={<PlusIcon />}>
        Add New
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Form
                action={(formData) =>
                  handleSubmit(addAccount, formData, onClose)
                }
              >
                <ModalHeader>Add Account</ModalHeader>
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
                  <Input
                    type="number"
                    size="md"
                    variant="bordered"
                    label="Starting Balance"
                    labelPlacement="outside"
                    placeholder="Enter Starting Balance"
                    name="balance"
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

export default AddAccountModal;
