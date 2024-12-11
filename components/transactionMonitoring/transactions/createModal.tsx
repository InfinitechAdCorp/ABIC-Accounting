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
  DatePicker,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { FormattedAccount } from "@/components/transactionMonitoring/types";
import { create as createSchema } from "@/components/transactionMonitoring/transactions/schemas";
import { useFormik } from "formik";
import { create as createAction } from "@/components/transactionMonitoring/transactions/actions";
import { Prisma } from "@prisma/client";
import { handlePostSubmit } from "@/components/globals/utils";
import { dateValueToDate } from "@/components/globals/utils";

type Props = {
  accounts: FormattedAccount[];
};

const CreateModal = ({ accounts }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const onSubmit = async (
    values: Prisma.TransactionCreateInput,
    actions: { resetForm: () => void }
  ) => {
    createAction(values).then((response) =>
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
    setFieldValue,
  } = useFormik({
    initialValues: {
      date: "",
      voucher: "",
      check: "",
      account_id: "",
      particulars: "",
      type: "",
      amount: "",
    },
    validationSchema: createSchema,
    onSubmit,
  });

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Transaction
      </Button>

      <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit}>
                <ModalHeader>Add Transaction</ModalHeader>
                <ModalBody>
                  <DatePicker
                    size="md"
                    variant="bordered"
                    label="Voucher Date"
                    labelPlacement="outside"
                    name="date"
                    onChange={(value) => {
                      const date = dateValueToDate(value);
                      setFieldValue("date", date);
                    }}
                    onBlur={handleBlur}
                  />
                  {errors.date && touched.date && (
                    <small className="text-red-500">{errors.date}</small>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Input
                        type="text"
                        size="md"
                        variant="bordered"
                        label="Voucher Number"
                        labelPlacement="outside"
                        placeholder="Enter Voucher Number"
                        name="voucher"
                        value={values.voucher}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.voucher && touched.voucher && (
                        <small className="text-red-500">{errors.voucher}</small>
                      )}
                    </div>

                    <div>
                      <Input
                        type="text"
                        size="md"
                        variant="bordered"
                        label="Check Number"
                        labelPlacement="outside"
                        placeholder="Enter Check Number"
                        name="check"
                        value={values.check}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.check && touched.check && (
                        <small className="text-red-500">{errors.check}</small>
                      )}
                    </div>
                  </div>

                  <div>
                    <Select
                      size="md"
                      variant="bordered"
                      label="Account"
                      labelPlacement="outside"
                      placeholder="Select Account"
                      name="account_id"
                      items={accounts}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {(account) => (
                        <SelectItem key={account.id}>{account.name}</SelectItem>
                      )}
                    </Select>
                    {errors.account_id && touched.account_id && (
                      <small className="text-red-500">
                        {errors.account_id}
                      </small>
                    )}
                  </div>

                  <div>
                    <Textarea
                      size="md"
                      variant="bordered"
                      label="Particulars"
                      labelPlacement="outside"
                      placeholder="Enter Particulars"
                      name="particulars"
                      value={values.particulars}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.particulars && touched.particulars && (
                      <small className="text-red-500">
                        {errors.particulars}
                      </small>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Select
                        size="md"
                        variant="bordered"
                        label="Type"
                        labelPlacement="outside"
                        placeholder="Select Type"
                        name="type"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <SelectItem key="Credit">Credit</SelectItem>
                        <SelectItem key="Debit">Debit</SelectItem>
                      </Select>
                      {errors.type && touched.type && (
                        <small className="text-red-500">{errors.type}</small>
                      )}
                    </div>

                    <div>
                      <Input
                        type="text"
                        size="md"
                        variant="bordered"
                        label="Amount"
                        labelPlacement="outside"
                        placeholder="Enter Amount"
                        name="amount"
                        value={values.amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.amount && touched.amount && (
                        <small className="text-red-500">{errors.amount}</small>
                      )}
                    </div>
                  </div>
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
