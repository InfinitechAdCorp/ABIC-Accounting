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
} from "@nextui-org/react";
import { ActionResponse } from "@/components/globals/types";
import { cancel as cancelSchema } from "@/components/transactionHistory/transactions/schemas";
import { Formik, Form, Field } from "formik";
import { handlePostSubmit } from "@/components/globals/utils";
import { FaXmark } from "react-icons/fa6";

type Props = {
  action: (values: { id: string }) => Promise<ActionResponse>;
  id: string;
};

const CancelModal = ({ action, id }: Props) => {
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
      handlePostSubmit(response, actions, onClose);
    });
  };

  return (
    <>
      <Button
        className="text-white"
        size="sm"
        color="danger"
        isIconOnly={true}
        title="Cancel"
        onPress={onOpen}
      >
        <FaXmark size={14} />
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={cancelSchema}
                onSubmit={onSubmit}
              >
                {() => (
                  <Form>
                    <ModalHeader>Cancel Transaction</ModalHeader>
                    <ModalBody>
                      <Field type="hidden" name="id" />
                      <h6>
                        Are you sure that you want to cancel this transaction?
                      </h6>
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

export default CancelModal;
