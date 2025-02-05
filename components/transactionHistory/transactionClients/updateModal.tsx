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
  Input,
} from "@heroui/react";
import { FormattedTransactionClient } from "@/components/transactionHistory/types";
import { update as updateSchema } from "@/components/transactionHistory/transactionClients/schemas";
import { Formik, Form, Field, FieldProps } from "formik";
import { update as updateAction } from "@/components/transactionHistory/transactionClients/actions";
import { Prisma } from "@prisma/client";
import { handlePostSubmit } from "@/components/globals/utils";
import { FaPenToSquare } from "react-icons/fa6";

type Props = {
  transactionClient: FormattedTransactionClient;
};

const UpdateModal = ({ transactionClient }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    id: transactionClient.id,
    name: transactionClient.name,
  };

  const onSubmit = async (
    values: Prisma.TransactionClientCreateInput,
    actions: { resetForm: () => void }
  ) => {
    setSubmitting(true);
    updateAction(values).then((response) => {
      setSubmitting(false);
      handlePostSubmit(response, actions, onClose);
    });
  };

  return (
    <>
      <Button
        size="sm"
        color="primary"
        isIconOnly={true}
        title="Edit"
        onPress={onOpen}
      >
        <FaPenToSquare size={14} />
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={updateSchema}
                onSubmit={onSubmit}
                enableReinitialize={true}
              >
                {() => (
                  <Form>
                    <ModalHeader>Update Client</ModalHeader>
                    <ModalBody>
                      <Field type="hidden" name="id" />

                      <Field name="name">
                        {({ field, meta }: FieldProps) => (
                          <div>
                            <Input
                              {...field}
                              type="text"
                              size="md"
                              variant="bordered"
                              label="Name"
                              labelPlacement="outside"
                              placeholder="Enter Name"
                            />
                            {meta.touched && meta.error && (
                              <small className="text-red-500">
                                {meta.error}
                              </small>
                            )}
                          </div>
                        )}
                      </Field>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        type="submit"
                        isLoading={submitting}
                      >
                        Update
                      </Button>
                      <Button color="danger" onPress={onClose}>
                        Cancel
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

export default UpdateModal;
