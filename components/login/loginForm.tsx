"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
} from "@nextui-org/react";
import { login as loginAction } from "@/components/globals/auth";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, FieldProps } from "formik";
import { login as loginSchema } from "@/components/globals/schemas";
import { Login } from "@/components/globals/types";

const LoginForm = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const initialValues = {
    username: "admin",
    password: "admin",
  };

  const onSubmit = async (
    values: Login,
    actions: { resetForm: () => void }
  ) => {
    setSubmitting(true);
    loginAction(values).then((response) => {
      setSubmitting(false);
      actions.resetForm();
      if (response.isValid) {
        toast.success(response.message);
        sessionStorage.setItem("isLoggedIn", "true");
        router.push("/accounts");
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <>
      <Card className="m-5 md:m-7 p-5 w-[30rem]">
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <CardHeader>
                <div className="flex w-full justify-center">
                  <Image
                    src={"/logo.jpg"}
                    width={200}
                    height={200}
                    alt="logo"
                  />
                </div>
              </CardHeader>
              <CardBody>
                <Field name="username">
                  {({ field, meta }: FieldProps) => (
                    <div className="mb-3">
                      <Input
                        {...field}
                        type="text"
                        size="md"
                        variant="bordered"
                        label="Username"
                        labelPlacement="outside"
                        placeholder="Enter Username"
                      />
                      {meta.touched && meta.error && (
                        <small className="text-red-500">{meta.error}</small>
                      )}
                    </div>
                  )}
                </Field>

                <Field name="password">
                  {({ field, meta }: FieldProps) => (
                    <div>
                      <Input
                        {...field}
                        type="password"
                        size="md"
                        variant="bordered"
                        label="Password"
                        labelPlacement="outside"
                        placeholder="Enter Password"
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
                  Login
                </Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default LoginForm;
