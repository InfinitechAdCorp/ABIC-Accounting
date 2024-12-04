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
import { FormattedAccount } from "@/components/transactionMonitoring/types";
import { update as updateSchema } from "@/components/transactionMonitoring/accounts/schemas";
import { useFormik } from "formik";
import { update as updateAction } from "@/components/transactionMonitoring/accounts/actions";
import { Prisma } from "@prisma/client";
import { handlePostSubmit } from "@/components/globals/utils";

interface Props {
  account: FormattedAccount;
}

const UpdateModal = ({ account }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onSubmit = async (
    values: Prisma.AccountCreateInput,
    actions: { resetForm: () => void }
  ) => {
    updateAction(values).then((response) =>
      handlePostSubmit(response, actions, onClose)
    );
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
      id: account.id,
      name: account.name,
      starting_balance: account.starting_balance,
    },
    validationSchema: updateSchema,
    onSubmit,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
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
                  <input type="hidden" value={values.id} name="id" />

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
                    value={values.starting_balance.toString()}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.starting_balance && touched.starting_balance && (
                    <small className="text-red-500">
                      {errors.starting_balance}
                    </small>
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
