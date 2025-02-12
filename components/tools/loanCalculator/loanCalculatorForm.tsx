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
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const initialValues = {
    amount: "",
    years: "",
    months: "",
    rate: "",
  };

  const calculate = (values: LoanCalculator) => {
    const amount = Number(values.amount);
    const years = Number(values.years);
    const months = Number(values.months);
    const rate = Number(values.rate);

    const totalMonths = years * 12 + months;
    const monthlyRate = rate / 100 / 12;

    const monthlyPayment =
      (amount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalPayment = monthlyPayment * totalMonths;

    setMonthlyPayment(monthlyPayment);
    setTotalPayment(totalPayment);
  };

  const onSubmit = async (
    values: LoanCalculator,
    actions: { resetForm: () => void }
  ) => {
    setSubmitting(true);
    calculate(values);
    setSubmitting(false);
    actions.resetForm();
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
              <CardHeader>
                <div className="flex items-center justify-center w-full">
                  <h3 className="text-base font-semibold">Loan Calculator</h3>
                </div>
              </CardHeader>
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

      <Card className="m-5 md:m-7 p-5 w-[30rem]">
        <CardHeader>
          <div className="flex items-center justify-center w-full">
            <h3 className="text-base font-semibold">Result</h3>
          </div>
        </CardHeader>
        <CardBody>
          <h3 className="text-base">
            Monthly Payment:{" "}
            <span className="text-base font-semibold">
              {monthlyPayment.toFixed(2)}
            </span>
          </h3>
          <h3 className="text-base">
            Total Payment:{" "}
            <span className="text-base font-semibold">
              {totalPayment.toFixed(2)}
            </span>
          </h3>
        </CardBody>
      </Card>
    </>
  );
};

export default LoanCalculatorForm;
