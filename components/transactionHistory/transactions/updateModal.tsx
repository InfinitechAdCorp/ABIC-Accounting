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
} from "@heroui/react";
import {
  Transaction as Record,
  TClient,
} from "@/components/transactionHistory/types";
import { update as validationSchema } from "@/components/transactionHistory/transactions/schemas";
import { Formik, Form, Field, FormikProps, FieldProps } from "formik";
import { update as action } from "@/components/transactionHistory/transactions/actions";
import { Prisma } from "@prisma/client";
import {
  onPostSubmit,
  dateToDateValue,
  dateValueToDate,
} from "@/components/globals/utils";
import { FaPenToSquare } from "react-icons/fa6";

type Props = {
  record: Record;
  tClients: TClient[];
};

type TransactionCreateInput = Prisma.TransactionCreateInput & {
  proof: File;
};

const UpdateModal = ({ record, tClients }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    id: record.id,
    date: record.date,
    voucher: record.voucher,
    check: record.check,
    t_client_id: record.t_client_id,
    particulars: record.particulars,
    type: record.type,
    amount: record.amount,
    status: record.status,
    proof: null,
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
      <Button
        size="sm"
        color="primary"
        isIconOnly={true}
        title="Edit"
        onPress={onOpen}
      >
        <FaPenToSquare size={14} />
      </Button>

      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize={true}
              >
                {(props: FormikProps<any>) => (
                  <Form>
                    <ModalHeader>Update Transaction</ModalHeader>
                    <ModalBody>
                      <Field type="hidden" name="id" />
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
                              items={tClients}
                              defaultSelectedKeys={[field.value]}
                            >
                              {(tClient) => (
                                <SelectItem key={tClient.id}>
                                  {tClient.name}
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
                                defaultSelectedKeys={[record.type]}
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
