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
  DatePicker,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import {
  FormattedTransaction,
  FormattedAccount,
} from "@/components/transactionHistory/types";
import { update as updateSchema } from "@/components/transactionHistory/transactions/schemas";
import { Formik, Form, Field, FormikProps, FieldProps } from "formik";
import { update as updateAction } from "@/components/transactionHistory/transactions/actions";
import { Prisma } from "@prisma/client";
import {
  handlePostSubmit,
  dateToDateValue,
  dateValueToDate,
} from "@/components/globals/utils";
import { FaPenToSquare } from "react-icons/fa6";

type Props = {
  transaction: FormattedTransaction;
  accounts: FormattedAccount[];
};

const UpdateModal = ({ transaction, accounts }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const initialValues = {
    id: transaction.id,
    date: transaction.date,
    voucher: transaction.voucher,
    check: transaction.check,
    account_id: transaction.account_id,
    particulars: transaction.particulars,
    type: transaction.type,
    amount: transaction.amount,
  };

  const onSubmit = async (
    values: Prisma.TransactionCreateInput,
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

      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={updateSchema}
                onSubmit={onSubmit}
                enableReinitialize={true}
              >
                {(props: FormikProps<any>) => (
                  <Form>
                    <ModalHeader>Update Transaction</ModalHeader>
                    <ModalBody>
                      <Field type="hidden" name="id" />

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
                                props.setFieldValue("date", date);
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

                      <Field name="account_id">
                        {({ field, meta }: FieldProps) => (
                          <div>
                            <Select
                              {...field}
                              size="md"
                              variant="bordered"
                              label="Account"
                              labelPlacement="outside"
                              placeholder="Select Account"
                              items={accounts}
                              defaultSelectedKeys={[field.value]}
                            >
                              {(account) => (
                                <SelectItem key={account.id}>
                                  {account.name}
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
                                defaultSelectedKeys={[transaction.type]}
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
