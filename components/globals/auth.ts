"use server";

import { Login } from "@/components/globals/types";
import { login as loginSchema } from "@/components/globals/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";
import { cookies } from "next/headers";

export const login = async (values: Login) => {
  const schema = loginSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (errors) {
    const formattedErrors = formatErrors(errors as Yup.ValidationError);

    const response = {
      code: 429,
      message: "Validation Error",
      isValid: false,
      errors: formattedErrors,
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

export const set = async (accountID: string) => {
  const session = await cookies();
  session.set("accountID", accountID);

  const response = {
    code: 200,
    message: "Account Set",
  };

  return response;
};

export const unset = async () => {
  const session = await cookies();
  session.delete('accountID');

  const response = {
    code: 200,
    message: "Account Unset",
  };

  return response;
};

export const logout = async () => {
  const session = await cookies();

  const keys = ["isLoggedIn", "accountID"];
  keys.forEach((key) => {
    session.delete(key);
  });

  const response = {
    code: 200,
    message: "Logged Out",
  };

  return response;
};
