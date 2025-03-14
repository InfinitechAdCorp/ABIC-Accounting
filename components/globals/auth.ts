"use server";

import { Login } from "@/components/globals/types";
import { login as loginSchema } from "@/components/globals/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";
import { cookies } from "next/headers";
import prisma from "@/lib/db";

export const login = async (values: Login) => {
  const schema = loginSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (ufErrors) {
    const errors = formatErrors(ufErrors as Yup.ValidationError);

    const response = {
      code: 429,
      message: "Validation Error",
      isValid: false,
      errors: errors,
    };
    return response;
  }

  const isValid =
    values.username == process.env.LOGIN_USERNAME &&
    values.password == process.env.LOGIN_PASSWORD;

  const session = await cookies();
  session.set("isLoggedIn", `${isValid}`);

  const response = {
    code: isValid ? 200 : 401,
    message: isValid ? "Logged In" : "Invalid Credentials",
    isValid: isValid,
  };

  return response;
};

export const set = async (id: string) => {
  const record = await prisma.account.findUnique({
    where: { id: id },
  });

  const session = await cookies();
  session.set("id", id);
  session.set("name", record!.name);
  session.set("listingsAccess", `${record!.listings_access}`);
  session.set("collectionsAccess", `${record!.collections_access}`);

  const response = {
    code: 200,
    message: "Account Set",
  };

  return response;
};

export const unset = async () => {
  const session = await cookies();
  session.delete("id");

  const response = {
    code: 200,
    message: "Account Unset",
  };

  return response;
};

export const logout = async () => {
  const session = await cookies();

  const keys = [
    "isLoggedIn",
    "id",
    "name",
    "listingsAccess",
    "collectionsAccess",
  ];
  keys.forEach((key) => {
    session.delete(key);
  });

  const response = {
    code: 200,
    message: "Logged Out",
  };

  return response;
};
