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
import { markAsPaid } from "@/components/contractMonitoring/contracts/schemas";
import { useFormik } from "formik";

interface Props {
  action: (values: { id: string }) => Promise<ActionResponse>;
  id: string;
}

const PaymentModal = ({ action, id }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = async (values: { id: string }, actions) => {
    action(values);
    actions.resetForm();
  };

  const { values, isSubmitting, handleSubmit } = useFormik({
    initialValues: {
      id: id,
    },
    validationSchema: markAsPaid,
    onSubmit,
  });

  return (
    <>
      <Button size="sm" color="success" onPress={onOpen} className="text-white">
        Mark as Paid
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit}>
                <ModalHeader>Mark As Paid</ModalHeader>
                <ModalBody>
                  <input type="hidden" value={values.id} name="id" />
                  <h6>Are you sure that you want to mark this as paid?</h6>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isSubmitting}
                  >
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

export default PaymentModal;
