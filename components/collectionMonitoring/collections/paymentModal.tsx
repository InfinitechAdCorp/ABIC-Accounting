"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { ActionResponse } from "@/components/globals/types";
import { markAsPaid as validationSchema } from "@/components/collectionMonitoring/collections/schemas";
import { Formik, Form, Field } from "formik";
import { onPostSubmit } from "@/components/globals/utils";
import { MdPayments } from "react-icons/md";

type Props = {
  action: (values: { id: string }) => Promise<ActionResponse>;
  id: string;
};

const PaymentModal = ({ action, id }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    id: id,
  };

  const onSubmit = async (
    values: { id: string },
    actions: { resetForm: () => void }
  ) => {
    setSubmitting(true);
    action(values).then((response) => {
      setSubmitting(false);
      onPostSubmit(response, actions, onClose);
    });
  };

  return (
    <>
      <Button
        className="text-white"
        size="sm"
        color="success"
        isIconOnly={true}
        title="Mark as Paid"
        onPress={onOpen}
      >
        <MdPayments size={14} />
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {() => (
                  <Form>
                    <ModalHeader>Mark As Paid</ModalHeader>
                    <ModalBody>
                      <Field type="hidden" name="id" />
                      <h6>Are you sure that you want to mark this as paid?</h6>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        type="submit"
                        isLoading={submitting}
                      >
                        Yes
                      </Button>
                      <Button color="danger" onPress={onClose}>
                        No
                      </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentModal;
