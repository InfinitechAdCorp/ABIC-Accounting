"use client";

import React, { useState } from "react";
import {
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Checkbox,
} from "@heroui/react";
import { create as validationSchema } from "@/components/accounts/schemas";
import { Formik, Form, Field, FieldProps } from "formik";
import { create as action } from "@/components/accounts/actions";
import { Prisma } from "@prisma/client";
import { onPostSubmit } from "@/components/globals/utils";
import { PlusIcon } from "@/components/globals/icons";

const CreateModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    name: "",
    th_access: false,
    cm_access: false,
  };

  const onSubmit = async (
    values: Prisma.AccountCreateInput,
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
      <Card className="mb-1" onPress={onOpen} isHoverable isPressable>
        <CardBody className="flex items-center justify-center py-16">
          <PlusIcon size={50} />
          <div className="text-center">
            <h3 className="text-sm md:text-xl font-bold">Add Account</h3>
          </div>
        </CardBody>
      </Card>

      <Modal size="md" isOpen={isOpen} onOpenChange={onOpenChange}>
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
                    <ModalHeader>Add Account</ModalHeader>
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

                      <label>Select Access</label>
                      <div className="flex gap-3">
                        <Field name="th_access">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Checkbox {...field}>
                                Transaction History
                              </Checkbox>
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="cm_access">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Checkbox {...field}>
                                Collection Monitoring
                              </Checkbox>
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
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
