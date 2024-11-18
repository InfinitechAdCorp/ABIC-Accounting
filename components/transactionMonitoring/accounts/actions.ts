"use server";

import prisma from "@/lib/db";
import {
  FormattedAccount,
  ActionResponse,
} from "@/components/transactionMonitoring/types";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import * as Yup from "yup";

export async function getAccounts() {
  let accounts = [];

  try {
    accounts = await prisma.account.findMany({
      include: { transactions: true },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      accounts: [],
    };
    return response;
  }

  const formattedAccounts: FormattedAccount[] = [];
  accounts.map((account) => {
    let balance = account.balance.toNumber();
    const transactions = account.transactions;
    transactions.map((transaction) => {
      const amount = transaction.amount.toNumber();
      if (transaction.type == "Credit") {
        balance += amount;
      } else {
        balance -= amount;
      }
    });

    const formattedAccount = {
      ...account,
      balance: balance,
      transactions: transactions.length,
    };
    formattedAccounts.push(formattedAccount);
  });

  const response = {
    code: 200,
    message: "Fetched Accounts",
    accounts: formattedAccounts,
  };
  return response;
}

export async function addAccount(formData: FormData) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    balance: Yup.number().moreThan(-1),
  });

  const request: Prisma.AccountCreateInput = {
    name: formData.get("name") as string,
    balance: formData.get("balance") as string,
  };

  try {
    await schema.validate(request, { abortEarly: false });
  } catch (errors) {
    const formattedErrors: { [key: string]: string } = {};

    (errors as Yup.ValidationError).inner.forEach((error) => {
      if (error.path) {
        formattedErrors[error.path] = error.message;
      }
    });

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: formattedErrors,
    };
    return response;
  }

  try {
    await prisma.account.create({ data: { ...request } });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/accounts");
  const response: ActionResponse = { code: 200, message: "Added Account" };
  return response;
}

export async function updateAccount(formData: FormData) {
  const schema = Yup.object().shape({
    id: Yup.string().required(),
    name: Yup.string().required(),
    balance: Yup.number().moreThan(-1),
  });

  const request: Prisma.AccountCreateInput = {
    id: formData.get("id") as string,
    name: formData.get("name") as string,
    balance: formData.get("balance") as string,
  };

  try {
    await schema.validate(request, { abortEarly: false });
  } catch (errors) {
    const formattedErrors: { [key: string]: string } = {};

    (errors as Yup.ValidationError).inner.forEach((error) => {
      if (error.path) {
        formattedErrors[error.path] = error.message;
      }
    });

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: formattedErrors,
    };
    return response;
  }

  try {
    await prisma.account.update({
      where: {
        id: request.id,
      },
      data: {
        name: request.name,
        balance: request.balance,
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/accounts");
  const response: ActionResponse = { code: 200, message: "Updated Account" };
  return response;
}

export async function deleteAccount(formData: FormData) {
  const schema = Yup.object().shape({
    id: Yup.string().required(),
  });

  const request = {
    id: formData.get("id") as string,
  };

  try {
    await schema.validate(request, { abortEarly: false });
  } catch (errors) {
    const formattedErrors: { [key: string]: string } = {};

    (errors as Yup.ValidationError).inner.forEach((error) => {
      if (error.path) {
        formattedErrors[error.path] = error.message;
      }
    });

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: formattedErrors,
    };
    return response;
  }

  try {
    await prisma.account.delete({
      where: { id: request.id },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/accounts");
  const response: ActionResponse = {
    code: 200,
    message: "Deleted Account",
  };
  return response;
}
