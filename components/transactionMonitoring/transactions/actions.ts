"use server";

import prisma from "@/lib/db";
import { ActionResponse } from "@/components/transactionMonitoring/types";
import { revalidatePath } from "next/cache";
import * as Yup from "yup";


export async function getTransactions() {
  let transactions = [];

  try {
    transactions = await prisma.transaction.findMany({
      include: {
        account: true,
      },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      transactions: [],
    };
    return response;
  }

  const response = {
    code: 200,
    message: "Fetched Transactions",
    transactions: transactions,
  };
  return response;
}

export async function addTransaction(formData: FormData) {
  const schema = Yup.object().shape({
    date: Yup.date().required(),
    voucher: Yup.string().required(),
    check: Yup.string().required(),
    account_id: Yup.string().required(),
    particulars: Yup.string().required(),
    type: Yup.string().required(),
    amount: Yup.number().moreThan(-1),
  });

  const request = {
    date: formData.get("date") as string,
    voucher: formData.get("voucher") as string,
    check: formData.get("check") as string,
    account_id: formData.get("account_id") as string,
    particulars: formData.get("particulars") as string,
    type: formData.get("type") as string,
    amount: formData.get("amount") as string,
  };

  try {
    await schema.validate(request, { abortEarly: false });
  } catch (errors) {
    const formattedErrors = formatErrors(errors as Yup.ValidationError);

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: formattedErrors,
    };
    return response;
  }

  try {
    await prisma.transaction.create({
      data: {
        date: new Date(new Date(request.date).setUTCHours(0, 0, 0, 0)),
        voucher: request.voucher,
        check: request.check,
        particulars: request.particulars,
        type: request.type,
        amount: request.amount,
        account: { connect: { id: request.account_id } },
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/transactions");
  const response: ActionResponse = { code: 200, message: "Added Transaction" };
  return response;
}

export async function updateTransaction(formData: FormData) {
  const schema = Yup.object().shape({
    id: Yup.string().required(),
    date: Yup.date().required(),
    voucher: Yup.string().required(),
    check: Yup.string().required(),
    account_id: Yup.string().required(),
    particulars: Yup.string().required(),
    type: Yup.string().required(),
    amount: Yup.number().moreThan(-1),
  });

  const request = {
    id: formData.get("id") as string,
    date: formData.get("date") as string,
    voucher: formData.get("voucher") as string,
    check: formData.get("check") as string,
    account_id: formData.get("account_id") as string,
    particulars: formData.get("particulars") as string,
    type: formData.get("type") as string,
    amount: formData.get("amount") as string,
  };

  try {
    await schema.validate(request, { abortEarly: false });
  } catch (errors) {
    const formattedErrors = formatErrors(errors as Yup.ValidationError);

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: formattedErrors,
    };
    return response;
  }

  try {
    await prisma.transaction.update({
      where: { id: request.id },
      data: {
        date: new Date(new Date(request.date).setUTCHours(0, 0, 0, 0)),
        voucher: request.voucher,
        check: request.check,
        particulars: request.particulars,
        type: request.type,
        amount: request.amount,
        account: { connect: { id: request.account_id } },
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/transactions");
  const response: ActionResponse = {
    code: 200,
    message: "Updated Transaction",
  };
  return response;
}

export async function deleteTransaction(formData: FormData) {
  const schema = Yup.object().shape({
    id: Yup.string().required(),
  });

  const request = {
    id: formData.get("id") as string,
  };

  try {
    await schema.validate(request, { abortEarly: false });
  } catch (errors) {
    const formattedErrors = formatErrors(errors as Yup.ValidationError);

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: formattedErrors,
    };
    return response;
  }

  try {
    await prisma.transaction.delete({
      where: { id: request.id },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/transactions");
  const response: ActionResponse = {
    code: 200,
    message: "Deleted Transaction",
  };
  return response;
}

const formatErrors = (errors: Yup.ValidationError) => {
  const formattedErrors: { [key: string]: string } = {};
  errors.inner.forEach((error) => {
    if (error.path) {
      formattedErrors[error.path] = error.message;
    }
  });
  return formattedErrors;
};
