"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
} from "@nextui-org/react";
import { toast } from "react-toastify";

const Login = () => {
  const handleSubmit = (formData: FormData) => {
    const username = formData.get("username");
    const password = formData.get("password");

    if (
      username == process.env.LOGIN_USERNAME &&
      password == process.env.LOGIN_PASSWORD
    ) {
      sessionStorage.setItem("isLoggedIn", "true");
      toast.success("Logged In");
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card className="m-5 md:m-7 p-5 w-[30rem]">
          <form action={handleSubmit}>
            <CardHeader>
              <h1 className="text-2xl font-bold">Login</h1>
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
              <Button size="lg" color="primary" type="submit">
                Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Login;
