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
  Input,
  DatePicker,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { FormattedTransactionClient } from "@/components/transactionHistory/types";
import { create as createSchema } from "@/components/transactionHistory/transactions/schemas";
import { Formik, Form, Field, FormikProps, FieldProps } from "formik";
import { create as createAction } from "@/components/transactionHistory/transactions/actions";
import { Prisma } from "@prisma/client";
import {
  handlePostSubmit,
  dateToDateValue,
  dateValueToDate,
} from "@/components/globals/utils";

type Props = {
  transactionClients: FormattedTransactionClient[];
};

type TransactionCreateInput = Prisma.TransactionCreateInput & {
  proof: File;
};

const CreateModal = ({ transactionClients }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    date: "",
    voucher: "",
    check: "",
    transaction_client_id: "",
    particulars: "",
    type: "",
    amount: "",
    status: "Active",
    proof: "",
  };

  const onSubmit = async (
    values: TransactionCreateInput,
    actions: { resetForm: () => void }
  ) => {
    setSubmitting(true);
    createAction(values).then((response) => {
      setSubmitting(false);
      handlePostSubmit(response, actions, onClose);
    });
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Transaction
      </Button>

      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={createSchema}
                onSubmit={onSubmit}
              >
                {(props: FormikProps<any>) => (
                  <Form>
                    <ModalHeader>Add Transaction</ModalHeader>
                    <ModalBody>
                      <Field type="hidden" name="status" />

                      <Field name="date">
                        {({ field, meta }: FieldProps) => (
                          <div>
                            <DatePicker
                              {...field}
                              size="md"
                              variant="bordered"
                              label="Voucher Date"
                              labelPlacement="outside"
                              value={dateToDateValue(field.value)}
                              onChange={(value) => {
                                const date = dateValueToDate(value);
                                props.setFieldValue(field.name, date);
                              }}
                            />
                            {meta.touched && meta.error && (
                              <small className="text-red-500">
                                {meta.error}
                              </small>
                            )}
                          </div>
                        )}
                      </Field>

                      <div className="grid grid-cols-2 gap-3">
                        <Field name="voucher">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Input
                                {...field}
                                type="text"
                                size="md"
                                variant="bordered"
                                label="Voucher Number"
                                labelPlacement="outside"
                                placeholder="Enter Voucher Number"
                              />
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="check">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Input
                                {...field}
                                type="text"
                                size="md"
                                variant="bordered"
                                label="Check Number"
                                labelPlacement="outside"
                                placeholder="Enter Check Number"
                              />
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>

                      <Field name="transaction_client_id">
                        {({ field, meta }: FieldProps) => (
                          <div>
                            <Select
                              {...field}
                              size="md"
                              variant="bordered"
                              label="Client"
                              labelPlacement="outside"
                              placeholder="Select Client"
                              items={transactionClients}
                            >
                              {(transactionClient) => (
                                <SelectItem key={transactionClient.id}>
                                  {transactionClient.name}
                                </SelectItem>
                              )}
                            </Select>
                            {meta.touched && meta.error && (
                              <small className="text-red-500">
                                {meta.error}
                              </small>
                            )}
                          </div>
                        )}
                      </Field>

                      <Field name="particulars">
                        {({ field, meta }: FieldProps) => (
                          <div>
                            <Textarea
                              {...field}
                              size="md"
                              variant="bordered"
                              label="Particulars"
                              labelPlacement="outside"
                              placeholder="Enter Particulars"
                            />
                            {meta.touched && meta.error && (
                              <small className="text-red-500">
                                {meta.error}
                              </small>
                            )}
                          </div>
                        )}
                      </Field>

                      <div className="grid grid-cols-2 gap-3">
                        <Field name="type">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Select
                                {...field}
                                size="md"
                                variant="bordered"
                                label="Type"
                                labelPlacement="outside"
                                placeholder="Select Type"
                              >
                                <SelectItem key="Credit">Credit</SelectItem>
                                <SelectItem key="Debit">Debit</SelectItem>
                              </Select>
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>

                        <Field name="amount">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Input
                                {...field}
                                type="text"
                                size="md"
                                variant="bordered"
                                label="Amount"
                                labelPlacement="outside"
                                placeholder="Enter Amount"
                              />
                              {meta.touched && meta.error && (
                                <small className="text-red-500">
                                  {meta.error}
                                </small>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>

                      <div>
                        <Field name="proof">
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <Input
                                type="file"
                                size="md"
                                variant="bordered"
                                label="Proof"
                                labelPlacement="outside"
                                placeholder="Enter Proof"
                                onChange={(e) => {
                                  if (e.target.files) {
                                    props.setFieldValue(
                                      field.name,
                                      e.target.files[0]
                                    );
                                  }
                                }}
                                onBlur={field.onBlur}
                              />
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
                        Save
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

export default CreateModal;
