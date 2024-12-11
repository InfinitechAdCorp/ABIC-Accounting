"use client";

import React from "react";
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
import { useFormik } from "formik";
import { handlePostSubmit } from "@/components/globals/utils";
import { FaTrash } from "react-icons/fa6";

type Props = {
  title: string;
  action: (values: { id: string }) => Promise<ActionResponse>;
  id: string;
};

const DestroyModal = ({ title, action, id }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onSubmit = async (
    values: { id: string },
    actions: { resetForm: () => void }
  ) => {
    action(values).then((response) =>
      handlePostSubmit(response, actions, onClose)
    );
  };

  const { values, isSubmitting, handleSubmit } = useFormik({
    initialValues: {
      id: id,
    },
    validationSchema: destroySchema,
    onSubmit,
  });

  return (
    <>
      <Button size="sm" color="danger" isIconOnly={true} title="Delete" onPress={onOpen}>
        <FaTrash />
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit}>
                <ModalHeader>Delete {title}</ModalHeader>
                <ModalBody>
                  <input type="hidden" value={values.id} name="id" />
                  <h6>Are you sure that you want to delete this {title}?</h6>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Yes
                  </Button>
                  <Button color="danger" onPress={onClose}>
                    No
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DestroyModal;
