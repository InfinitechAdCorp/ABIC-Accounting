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
} from "@nextui-org/react";
import { create as createSchema } from "@/components/transactionHistory/transactionClients/schemas";
import { Formik, Form, Field, FieldProps } from "formik";
import { create as createAction } from "@/components/transactionHistory/transactionClients/actions";
import { Prisma } from "@prisma/client";
import { handlePostSubmit } from "@/components/globals/utils";


const CreateModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    name: "",
  };

  const onSubmit = async (
    values: Prisma.TransactionClientCreateInput,
    actions: { resetForm: () => void }
  ) => {
    setSubmitting(true);
    createAction(values).then((response) => {
      setSubmitting(false);
      handlePostSubmit(response, actions, onClose);
    });
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Client
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={createSchema}
                onSubmit={onSubmit}
              >
                {() => (
                  <Form>
                    <ModalHeader>Add Client</ModalHeader>
                    <ModalBody>
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
                        Save
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

export default CreateModal;
