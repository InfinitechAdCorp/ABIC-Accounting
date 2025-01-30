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
import { destroy as destroySchema } from "@/components/globals/schemas";
import { Formik, Form, Field } from "formik";
import { handlePostSubmit } from "@/components/globals/utils";
import { FaTrash } from "react-icons/fa6";

type Props = {
  title: string;
  action: (values: { id: string }) => Promise<ActionResponse>;
  id: string;
};

const DestroyModal = ({ title, action, id }: Props) => {
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
        size="sm"
        color="danger"
        isIconOnly={true}
        title="Delete"
        onPress={onOpen}
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
                      <h6>
                        Are you sure that you want to delete this {title}?
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

export default DestroyModal;
