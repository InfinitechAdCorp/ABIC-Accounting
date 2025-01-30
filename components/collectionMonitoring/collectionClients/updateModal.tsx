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
import { FormattedCollectionClient } from "@/components/collectionMonitoring/types";
import { update as updateSchema } from "@/components/collectionMonitoring/collectionClients/schemas";
import { Formik, Form, Field, FormikProps, FieldProps } from "formik";
import { update as updateAction } from "@/components/collectionMonitoring/collectionClients/actions";
import { Prisma } from "@prisma/client";
import { handlePostSubmit } from "@/components/globals/utils";
import { FaPenToSquare } from "react-icons/fa6";

type Props = {
  collectionClient: FormattedCollectionClient;
};

const UpdateModal = ({ collectionClient }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const initialValues = {
    id: collectionClient.id,
    account_id: collectionClient.account_id,
    name: collectionClient.name,
  };

  const onSubmit = async (
    values: Prisma.CollectionClientCreateInput,
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
                {(props: FormikProps<any>) => (
                  <Form>
                    <ModalHeader>Update Client</ModalHeader>
                    <ModalBody>
                      <Field type="hidden" name="id" />
                      <Field type="hidden" name="account_id" />

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
