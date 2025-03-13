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
import { setStatus as validationSchema } from "@/components/transactionHistory/transactions/schemas";
import { Formik, Form, Field } from "formik";
import { onPostSubmit } from "@/components/globals/utils";
import { FaXmark } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

type Props = {
  action: (values: { id: string; status: string }) => Promise<ActionResponse>;
  id: string;
  status: string;
};

const SetStatusModal = ({ action, id, status }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    id: id,
    status: status == "Cancelled" ? "Restored" : "Cancelled",
  };

  const onSubmit = async (
    values: { id: string; status: string },
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
        isIconOnly={true}
        color={status == "Cancelled" ? "success" : "danger"}
        title={status == "Cancelled" ? "Restore" : "Cancel"}
        onPress={onOpen}
      >
        {status == "Cancelled" ? <FaCheck size={14} /> : <FaXmark size={14} />}
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
                    <ModalHeader>
                      {status == "Cancelled" ? "Restore" : "Cancel"} Transaction
                    </ModalHeader>
                    <ModalBody>
                      <Field type="hidden" name="id" />
                      <Field type="hidden" name="action" />
                      <h6>
                        Are you sure that you want to{" "}
                        {status == "Cancelled" ? "restore" : "cancel"} this
                        transaction?
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

export default SetStatusModal;
