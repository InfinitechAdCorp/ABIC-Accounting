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
    listings_access: false,
    collections_access: false,
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
      <Card className="py-16 mb-1" onPress={onOpen} isHoverable isPressable>
        <CardBody>
          <div
            className="flex items-center justify-center h-[5rem]"
            title="Add Account"
          >
            <PlusIcon size={50} />
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
                      <div className="flex gap-3 items-center justify-center">
                        <Field name="listings_access">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Checkbox {...field}>Listings</Checkbox>
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="collections_access">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Checkbox {...field}>
                                Collections
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
