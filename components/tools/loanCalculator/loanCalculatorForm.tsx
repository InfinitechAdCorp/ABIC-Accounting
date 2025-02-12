"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
} from "@heroui/react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Formik, Form, Field, FieldProps } from "formik";
import { calculate as validationSchema } from "@/components/tools/loanCalculator/schemas";
import { LoanCalculator } from "@/components/tools/loanCalculator/types";

const LoanCalculatorForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    amount: "",
    years: "",
    months: "",
    rate: "",
  };

  const onSubmit = async (
    values: LoanCalculator,
    actions: { resetForm: () => void }
  ) => {
    setSubmitting(true);
    console.log(values);
    // action(values).then(({ isValid, message }) => {
    //   setSubmitting(false);
    //   actions.resetForm();

    //   if (isValid) {
    //     toast.success(message);
    //     router.push("/accounts");
    //   } else {
    //     toast.error(message);
    //   }
    // });
  };

  return (
    <>
      <Card className="m-5 md:m-7 p-5 w-[30rem]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <CardHeader>Loan Calculator</CardHeader>
              <CardBody>
                <Field name="amount">
                  {({ field, meta }: FieldProps) => (
                    <div className="mb-3">
                      <Input
                        {...field}
                        type="number"
                        size="md"
                        variant="bordered"
                        label="Amount"
                        labelPlacement="outside"
                        placeholder="Enter Amount"
                      />
                      {meta.touched && meta.error && (
                        <small className="text-red-500">{meta.error}</small>
                      )}
                    </div>
                  )}
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field name="years">
                    {({ field, meta }: FieldProps) => (
                      <div className="mb-3">
                        <Input
                          {...field}
                          type="number"
                          size="md"
                          variant="bordered"
                          label="Years"
                          labelPlacement="outside"
                          placeholder="Enter Years"
                        />
                        {meta.touched && meta.error && (
                          <small className="text-red-500">{meta.error}</small>
                        )}
                      </div>
                    )}
                  </Field>

                  <Field name="months">
                    {({ field, meta }: FieldProps) => (
                      <div className="mb-3">
                        <Input
                          {...field}
                          type="number"
                          size="md"
                          variant="bordered"
                          label="Months"
                          labelPlacement="outside"
                          placeholder="Enter Months"
                        />
                        {meta.touched && meta.error && (
                          <small className="text-red-500">{meta.error}</small>
                        )}
                      </div>
                    )}
                  </Field>
                </div>

                <Field name="rate">
                  {({ field, meta }: FieldProps) => (
                    <div>
                      <Input
                        {...field}
                        type="number"
                        size="md"
                        variant="bordered"
                        label="Interest Rate"
                        labelPlacement="outside"
                        placeholder="Enter Interest Rate"
                      />
                      {meta.touched && meta.error && (
                        <small className="text-red-500">{meta.error}</small>
                      )}
                    </div>
                  )}
                </Field>
              </CardBody>
              <CardFooter className="justify-end">
                <Button
                  size="lg"
                  color="primary"
                  type="submit"
                  isLoading={submitting}
                >
                  Calculate
                </Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default LoanCalculatorForm;
