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
import { useRouter } from "next/navigation";
import { login } from "@/components/globals/auth";
import { toast } from "react-toastify";

export const dynamic = "force-dynamic";

const Login = () => {
  const router = useRouter();
  const isServer = typeof window === "undefined";

  if (!isServer) {
    sessionStorage.clear();
  }

  const handlePostSubmit = (isLoggedIn: boolean) => {
    if (isLoggedIn) {
      if (!isServer) {
        sessionStorage.setItem("isLoggedIn", "true");
      }
      
      toast.success("Logged In");
      router.push("/dashboard");
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card className="m-5 md:m-7 p-5 w-[30rem]">
          <form
            action={(formData) =>
              login(formData).then(({ isLoggedIn }) =>
                handlePostSubmit(isLoggedIn)
              )
            }
          >
            <CardHeader>
              <h1 className="text-2xl font-bold">Xero</h1>
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
