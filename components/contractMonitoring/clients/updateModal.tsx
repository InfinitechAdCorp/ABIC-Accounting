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
import { Formik, Form, Field, FormikProps, FieldProps } from "formik";
import { update as updateAction } from "@/components/contractMonitoring/clients/actions";
import { Prisma } from "@prisma/client";
import { handlePostSubmit } from "@/components/globals/utils";
import { FaPenToSquare } from "react-icons/fa6";

type Props = {
  client: FormattedClient;
};

type ClientCreateInput = Prisma.ClientCreateInput & { id: string };

const UpdateModal = ({ client }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const initialValues = {
    id: client.id,
    name: client.name,
  };

  const onSubmit = async (
    values: Prisma.ClientCreateInput,
    actions: { resetForm: () => void }
  ) => {
    updateAction(values).then((response) =>
      handlePostSubmit(response, actions, onClose)
    );
  };

  return (
    <>
      <Button
        size="sm"
        color="primary"
        isIconOnly={true}
        title="Edit"
        onPress={onOpen}
      >
        <FaPenToSquare size={14} />
      </Button>

      <Modal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={updateSchema}
                onSubmit={onSubmit}
              >
                {(props: FormikProps<ClientCreateInput>) => (
                  <Form>
                    <ModalHeader>Update Client</ModalHeader>
                    <ModalBody>
                      <Field type="hidden" name="id" />

                      <Field name="name">
                        {({ field, meta }: FieldProps) => (
                          <div>
                            <Input
                              type="text"
                              size="md"
                              variant="bordered"
                              label="Name"
                              labelPlacement="outside"
                              placeholder="Enter Name"
                              {...field}
                            />
                            {meta.touched && meta.error && (
                              <small className="text-red-500">
                                {meta.error}
                              </small>
                            )}
                          </div>
                        )}
                      </Field>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        type="submit"
                        isLoading={props.isSubmitting}
                      >
                        Update
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

export default UpdateModal;
