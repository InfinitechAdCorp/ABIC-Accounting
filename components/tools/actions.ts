"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createAR as createARSchema } from "@/components/tools/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";

export const getAllARs = async () => {
  let records;

  try {
    records = await prisma.aR.findMany();
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      records: [],
    };
    return response;
  }

  const response = {
    code: 200,
    message: `Fetched Acknowledgement Receipts`,
    records: records,
  };
  return response;
};

export const getAllBSs = async () => {
  let records;

  try {
    records = await prisma.bS.findMany();
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      records: [],
    };
    return response;
  }

  const response = {
    code: 200,
    message: `Fetched Billing Statements`,
    records: records,
  };
  return response;
};

export const createAR = async (values: Prisma.ARCreateInput) => {
  const schema = createARSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (ufErrors) {
    const errors = formatErrors(ufErrors as Yup.ValidationError);

    const response = {
      code: 429,
      message: "Validation Error",
      errors: errors,
    };
    return response;
  }

  try {
    await prisma.aR.create({
      data: {
        number: values.number,
      },
    });
  } catch (error) {
    const response = { code: 500, message: "Server Error", error: error };
    return response;
  }

  revalidatePath("/tools/acknowledgment-receipt");
  const response = { code: 200, message: `Added Acknowledgment Receipt` };
  return response;
};
