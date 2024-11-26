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
import { handleSubmit } from "@/components/globals/utils";
import Form from "next/form";

interface Props {
  action: (formData: FormData) => Promise<ActionResponse>;
  id: string;
}

const PaymentModal = ({ action, id }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button size="sm" color="success" onPress={onOpen} className="text-white">
        Mark as Paid
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Form
                action={(formData) => handleSubmit(action, formData, onClose)}
              >
                <ModalHeader>Mark as Paid</ModalHeader>
                <ModalBody>
                  <input type="hidden" value={id} name="id" />
                  <h6>Are you sure that you want to mark this as paid?</h6>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit">
                    Yes
                  </Button>
                  <Button color="danger" onPress={onClose}>
                    No
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

export default PaymentModal;
