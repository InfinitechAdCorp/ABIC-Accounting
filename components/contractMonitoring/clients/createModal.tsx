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
  Input,
} from "@nextui-org/react";
import { create as createSchema } from "@/components/contractMonitoring/clients/schemas";
import { useFormik } from "formik";
import { create as createAction } from "@/components/contractMonitoring/clients/actions";
import { Prisma } from "@prisma/client";
import { toast } from "react-toastify";

const CreateModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onSubmit = async (
    values: Prisma.ClientCreateInput,
    actions: { resetForm: () => void }
  ) => {
    createAction(values).then((response) => {
      if (response.code == 200) {
        actions.resetForm();
        toast.success(response.message);
        onClose();
      } else {
        if (response.code == 429) {
          console.log(response.errors);
        }
        toast.error(response.message);
      }
    });
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: createSchema,
    onSubmit,
  });

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Client
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit}>
                <ModalHeader>Add Client</ModalHeader>
                <ModalBody>
                  <Input
                    type="text"
                    size="md"
                    variant="bordered"
                    label="Name"
                    labelPlacement="outside"
                    placeholder="Enter Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name && (
                    <small className="text-red-500">{errors.name}</small>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                  <Button color="danger" onPress={onClose}>
                    Cancel
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

export default CreateModal;
