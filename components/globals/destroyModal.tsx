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
} from "@heroui/react";
import { ActionResponse } from "@/components/globals/types";
import { destroy as validationSchema } from "@/components/globals/schemas";
import { Formik, Form, Field, FieldProps } from "formik";
import { onPostSubmit } from "@/components/globals/utils";
import { FaTrash } from "react-icons/fa6";
import { sendOTP } from "@/components/globals/serverUtils";
import { Destroy } from "@/components/globals/types";

type Props = {
  title: string;
  action: (values: Destroy) => Promise<ActionResponse>;
  id: string;
};

const DestroyModal = ({ title, action, id }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);
  const [opening, setOpening] = useState(false);

  const initialValues = {
    id: id,
    otp: "",
  };

  const onPress = async () => {
    setOpening(true);
    await sendOTP();
    setOpening(false);
    onOpen();
  };

  const onSubmit = async (
    values: Destroy,
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
        size="sm"
        color="danger"
        isIconOnly={true}
        title="Delete"
        onPress={onPress}
        isLoading={opening}
      >
        <FaTrash />
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
                    <ModalHeader>Delete {title}</ModalHeader>
                    <ModalBody>
                      <Field type="hidden" name="id" />
                      <h6>Enter OTP to Confirm {title} Deletion</h6>

                      <div className="flex justify-center">
                        <Field name="otp">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <InputOtp {...field} length={6} errorMessage="OTP is a required field" />
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
