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
import { create as createSchema } from "@/components/transactionMonitoring/accounts/schemas";
import { useFormik } from "formik";
import { create as createAction } from "@/components/transactionMonitoring/accounts/actions";
import { Prisma } from "@prisma/client";

const CreateModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = async (values: Prisma.AccountCreateInput, actions) => {
    createAction(values);
    actions.resetForm();
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
      starting_balance: "",
    },
    validationSchema: createSchema,
    onSubmit,
  });

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add New
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit}>
                <ModalHeader>Add Account</ModalHeader>
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

                  <Input
                    type="text"
                    size="md"
                    variant="bordered"
                    label="Starting Balance"
                    labelPlacement="outside"
                    placeholder="Enter Starting Balance"
                    name="starting_balance"
                    value={values.starting_balance}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.starting_balance && touched.starting_balance && (
                    <small className="text-red-500">{errors.starting_balance}</small>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" type="submit" isLoading={isSubmitting}>
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
