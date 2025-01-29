"use client";

import React, { useState, useEffect } from "react";
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
import toast from 'react-hot-toast';
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handlePostSubmit = (isValid: boolean) => {
    if (isValid) {
      setIsLoggedIn(true);
      toast.success("Logged In");
      router.push("/accounts");
    } else {
      toast.error("Invalid Credentials");
    }
  };

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      sessionStorage.setItem("isLoggedIn", "true");
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card className="m-5 md:m-7 p-5 w-[30rem]">
          <form
            action={(formData) =>
              login(formData).then(({ isValid }) => handlePostSubmit(isValid))
            }
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
