"use server";

import { Login } from "@/components/globals/types";

export const login = async (values: Login) => {
  const isValid =
    values.username == process.env.LOGIN_USERNAME &&
    values.password == process.env.LOGIN_PASSWORD;
  const response = { isValid: isValid };
  return response;
};
