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
import { changeStatus as changeStatusSchema } from "@/components/transactionHistory/transactions/schemas";
import { Formik, Form, Field } from "formik";
import { handlePostSubmit } from "@/components/globals/utils";
import { FaXmark } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

type Props = {
  action: (values: { id: string; status: string }) => Promise<ActionResponse>;
  id: string;
  status: string;
};

const ChangeStatusModal = ({ action, id, status }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    id: id,
    status: status == "Active" ? "Cancelled" : "Active",
  };

  const onSubmit = async (
    values: { id: string; status: string },
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
        color={status == "Active" ? "danger" : "success"}
        isIconOnly={true}
        title={status == "Active" ? "Cancel" : "Restore"}
        onPress={onOpen}
      >
        {status == "Active" ? <FaXmark size={14} /> : <FaCheck size={14} />}
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={changeStatusSchema}
                onSubmit={onSubmit}
              >
                {() => (
                  <Form>
                    <ModalHeader>
                      {status == "Active" ? "Cancel" : "Restore"} Transaction
                    </ModalHeader>
                    <ModalBody>
                      <Field type="hidden" name="id" />
                      <Field type="hidden" name="status" />
                      <h6>
                        Are you sure that you want to{" "}
                        {status == "Active" ? "cancel" : "restore"} this
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

export default ChangeStatusModal;
