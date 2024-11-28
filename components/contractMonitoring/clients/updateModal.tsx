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
import { FormattedClient } from "@/components/contractMonitoring/types";
import { update as updateSchema } from "@/components/contractMonitoring/clients/schemas";
import { useFormik } from "formik";
import { update as updateAction } from "@/components/contractMonitoring/clients/actions";
import { Prisma } from "@prisma/client";

interface Props {
  client: FormattedClient;
}

const UpdateModal = ({ client }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = async (values: Prisma.ClientCreateInput) => {
    updateAction(values);
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
      id: client.id,
      name: client.name,
    },
    validationSchema: updateSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <>
      <Button size="sm" color="primary" onPress={onOpen}>
        Edit
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit}>
                <ModalHeader>Edit Account</ModalHeader>
                <ModalBody>
                  <input type="hidden" name="id" value={values.id} />

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
                    Update
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

export default UpdateModal;
