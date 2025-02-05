"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import {
  create as createSchema,
  update as updateSchema,
  changeStatus as changeStatusSchema,
} from "@/components/transactionHistory/transactions/schemas";
import { destroy as destroySchema } from "@/components/globals/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";
import { formatTransactions } from "@/components/globals/utils";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { list, put, del } from "@vercel/blob";
import { ulid } from "ulidx";
import { Destroy } from "@/components/globals/types";

type TransactionCreateInput = Prisma.TransactionCreateInput & {
  proof: File;
  transaction_client_id?: string;
};

export const getAll = async () => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value;

  let transactions;

  try {
    transactions = await prisma.transaction.findMany({
      where: {
        transaction_client: {
          account_id: accountID,
        },
      },
      include: {
        transaction_client: true,
      },
      orderBy: {
        date: 'desc',
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

  transactions = formatTransactions(transactions || []);
  const response = {
    code: 200,
    message: "Fetched Transactions",
    transactions: transactions,
  };
  return response;
};

export const create = async (values: TransactionCreateInput) => {
  const schema = createSchema;

  try {
    await schema.validate(values, { abortEarly: false });
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
    const proof = values.proof;
    const proofName = `${ulid()}.${proof.name.split(".").at(-1)}`;
    await put(proofName, proof, {
      access: "public",
    });

    await prisma.transaction.create({
      data: {
        transaction_client: { connect: { id: values.transaction_client_id } },
        date: new Date(new Date(values.date).setUTCHours(0, 0, 0, 0)),
        voucher: values.voucher,
        check: values.check,
        particulars: values.particulars,
        type: values.type,
        amount: values.amount,
        status: values.status,
        proof: proofName,
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/transaction-history/transactions");
  const response: ActionResponse = { code: 200, message: "Added Transaction" };
  return response;
};

export const update = async (values: TransactionCreateInput) => {
  const schema = updateSchema;

  try {
    await schema.validate(values, { abortEarly: false });
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
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: values.id,
      },
    });
    const oldProofName = transaction?.proof;

    const { blobs } = await list();
    const blob = blobs.find((blob) => {
      return oldProofName == blob.pathname;
    });

    if (blob) {
      await del(blob.url || "");
    }

    const proof = values.proof;
    const proofName = `${ulid()}.${proof.name.split(".").at(-1)}`;
    await put(proofName, proof, {
      access: "public",
    });

    await prisma.transaction.update({
      where: { id: values.id },
      data: {
        transaction_client: { connect: { id: values.transaction_client_id } },
        date: new Date(new Date(values.date).setUTCHours(0, 0, 0, 0)),
        voucher: values.voucher,
        check: values.check,
        particulars: values.particulars,
        type: values.type,
        amount: values.amount,
        status: values.status,
        proof: proofName,
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/transaction-history/transactions");
  const response: ActionResponse = {
    code: 200,
    message: "Updated Transaction",
  };
  return response;
};

export const destroy = async (values: Destroy) => {
  const session = await cookies();
  const otp = session.get("otp")?.value;
  const schema = destroySchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (errors) {
    const formattedErrors = formatErrors(errors as Yup.ValidationError);

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: formattedErrors,
    };
    return response;
  }

  if (otp == values.otp) {
    try {
      const transaction = await prisma.transaction.findUnique({
        where: {
          id: values.id,
        },
      });
      const proofName = transaction?.proof;

      const { blobs } = await list();
      const blob = blobs.find((blob) => {
        return proofName == blob.pathname;
      });

      if (blob) {
        await del(blob.url || "");
      }

      await prisma.transaction.delete({
        where: { id: values.id },
      });
    } catch (error) {
      const response: ActionResponse = {
        code: 500,
        message: "Server Error",
        error: error,
      };
      return response;
    }

    session.delete("otp");
  } else {
    const response: ActionResponse = {
      code: 401,
      message: "Invalid Token",
    };
    return response;
  }

  revalidatePath("/transaction-history/transactions");
  const response: ActionResponse = {
    code: 200,
    message: "Deleted Transaction",
  };
  return response;
};

export const changeStatus = async (values: { id: string; status: string }) => {
  const schema = changeStatusSchema;

  try {
    await schema.validate(values, { abortEarly: false });
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
      where: { id: values.id },
      data: {
        status: values.status,
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/transaction-history/transactions");
  const response: ActionResponse = {
    code: 200,
    message: `${
      values.status == "Active" ? "Restored" : "Cancelled"
    } Transaction`,
  };
  return response;
};
