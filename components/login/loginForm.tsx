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
import { login } from "@/components/globals/auth";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handlePostSubmit = (isValid: boolean) => {
    if (isValid) {
      toast.success("Logged In");
      sessionStorage.setItem("isLoggedIn", "true");
      router.push("/accounts");
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <>
      <Card className="m-5 md:m-7 p-5 w-[30rem]">
        <form
          action={(formData) => {
            setSubmitting(true);
            login(formData).then((response) => {
              setSubmitting(false);
              handlePostSubmit(response.isValid);
            });
          }}
        >
          <CardHeader>
            <div className="flex w-full justify-center">
              <Image src={"/logo.jpg"} width={200} height={200} alt="logo" />
            </div>
          </CardHeader>
          <CardBody>
            <Input
              className="mb-3"
              type="text"
              size="lg"
              variant="bordered"
              label="Username"
              labelPlacement="outside"
              placeholder="Enter Username"
              name="username"
            />
            <Input
              type="password"
              size="lg"
              variant="bordered"
              label="Password"
              labelPlacement="outside"
              placeholder="Enter Password"
              name="password"
            />
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
        </form>
      </Card>
    </>
  );
};

export default LoginForm;
