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
import { markAsPaid as markAsPaidSchema } from "@/components/contractMonitoring/contracts/schemas";
import { Formik, Form, Field, FormikProps } from "formik";
import { handlePostSubmit } from "@/components/globals/utils";
import { MdPayments } from "react-icons/md";

type Props = {
  action: (values: { id: string }) => Promise<ActionResponse>;
  id: string;
};

const PaymentModal = ({ action, id }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const initialValues = {
    id: id,
  };

  const onSubmit = async (
    values: { id: string },
    actions: { resetForm: () => void }
  ) => {
    action(values).then((response) =>
      handlePostSubmit(response, actions, onClose)
    );
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
                validationSchema={markAsPaidSchema}
                onSubmit={onSubmit}
              >
                {(props: FormikProps<{ id: string }>) => (
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
                        isLoading={props.isSubmitting}
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
