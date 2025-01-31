"use server";

import { Login } from "@/components/globals/types";
import { login as loginSchema } from "@/components/globals/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";

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

  const response = {
    code: isValid ? 200 : 401,
    message: isValid ? "Logged In" : "Invalid Credentials",
    isValid: isValid,
  };

  return response;
};
