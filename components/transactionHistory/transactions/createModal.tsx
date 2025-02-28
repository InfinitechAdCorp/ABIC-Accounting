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
  Autocomplete,
  AutocompleteItem,
  Textarea,
} from "@heroui/react";
import {
  TClient,
  TransactionCreateInput,
} from "@/components/transactionHistory/types";
import { create as validationSchema } from "@/components/transactionHistory/transactions/schemas";
import { Formik, Form, Field, FormikProps, FieldProps } from "formik";
import { create as action } from "@/components/transactionHistory/transactions/actions";
import {
  onPostSubmit,
  dateToDateValue,
  dateValueToDate,
} from "@/components/globals/utils";

type Props = {
  voucher: string;
  tClients: TClient[];
};

const CreateModal = ({ voucher, tClients }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    date: "",
    voucher: voucher,
    check: "",
    t_client_name: "",
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
    action(values).then((response) => {
      setSubmitting(false);
      onPostSubmit(response, actions, onClose);
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
                validationSchema={validationSchema}
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

                      <Field name="t_client_name">
                        {({ field, meta }: FieldProps) => (
                          <div>
                            <Autocomplete
                              allowsCustomValue
                              size="md"
                              variant="bordered"
                              label="Client"
                              labelPlacement="outside"
                              placeholder="Enter Client"
                              items={tClients}
                              onInputChange={(value: string) => {
                                props.setFieldValue(field.name, value);
                              }}
                              onSelectionChange={(key: React.Key | null) => {
                                props.setFieldValue(field.name, key);
                              }}
                            >
                              {(tClient) => (
                                <AutocompleteItem key={tClient.name}>
                                  {tClient.name}
                                </AutocompleteItem>
                              )}
                            </Autocomplete>
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
