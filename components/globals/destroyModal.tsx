"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  InputOtp,
  useDisclosure,
} from "@nextui-org/react";
import { ActionResponse } from "@/components/globals/types";
import { destroy as destroySchema } from "@/components/globals/schemas";
import { Formik, Form, Field, FieldProps } from "formik";
import { handlePostSubmit } from "@/components/globals/utils";
import { FaTrash } from "react-icons/fa6";
import { sendOTP } from "@/components/globals/serverUtils";

type Props = {
  title: string;
  action: (values: { id: string }) => Promise<ActionResponse>;
  id: string;
};

const DestroyModal = ({ title, action, id }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);

  const openModal = async () => {
    await sendOTP();
    onOpen();
  };

  const initialValues = {
    id: id,
    otp: "",
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
        size="sm"
        color="danger"
        isIconOnly={true}
        title="Delete"
        onPress={openModal}
      >
        <FaTrash />
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={destroySchema}
                onSubmit={onSubmit}
              >
                {() => (
                  <Form>
                    <ModalHeader>Delete {title}</ModalHeader>
                    <ModalBody>
                      <Field type="hidden" name="id" />
                      <h6>Enter OTP to Confirm {title} Deletion:</h6>

                      <div className="flex justify-center">
                        <Field name="otp">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <InputOtp {...field} length={6} />
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
                        Submit
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

export default DestroyModal;
