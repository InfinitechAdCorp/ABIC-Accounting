"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import {
  create as createSchema,
  update as updateSchema,
  setStatus as setStatusSchema,
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
  t_client_id?: string;
};

const model = "Transaction";
const url = "/transaction-history/transactions";

export const getAll = async () => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value;

  let records;

  try {
    records = await prisma.transaction.findMany({
      where: {
        t_client: {
          account_id: accountID,
        },
      },
      include: {
        t_client: true,
      },
      orderBy: [
        {
          date: "desc",
        },
        {
          created_at: "desc",
        },
      ],
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      records: [],
    };
    return response;
  }

  records = formatTransactions(records || []);
  const response = {
    code: 200,
    message: `Fetched ${model}s`,
    records: records,
  };
  return response;
};

export const create = async (values: TransactionCreateInput) => {
  const schema = createSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (ufErrors) {
    const errors = formatErrors(ufErrors as Yup.ValidationError);

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: errors,
    };
    return response;
  }

  try {
    const file = values.proof;
    const extension = file.name.split(".").at(-1);
    const proof = `${ulid()}.${extension}`;
    await put(proof, file, {
      access: "public",
    });

    await prisma.transaction.create({
      data: {
        t_client: { connect: { id: values.t_client_id } },
        date: new Date(new Date(values.date).setUTCHours(0, 0, 0, 0)),
        voucher: values.voucher,
        check: values.check,
        particulars: values.particulars,
        type: values.type,
        amount: values.amount,
        status: values.status,
        proof: proof,
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath(url);
  const response: ActionResponse = { code: 200, message: `Added ${model}` };
  return response;
};

export const update = async (values: TransactionCreateInput) => {
  const schema = updateSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (ufErrors) {
    const errors = formatErrors(ufErrors as Yup.ValidationError);

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: errors,
    };
    return response;
  }

  try {
    const file = values.proof;
    let proof;

    if (file) {
      const record = await prisma.transaction.findUnique({
        where: {
          id: values.id,
        },
      });
      const old = record?.proof;

      const { blobs } = await list();
      const blob = blobs.find((blob) => {
        return old == blob.pathname;
      });

      if (blob) {
        await del(blob.url || "");
      }

      const extension = file.name.split(".").at(-1);
      proof = `${ulid()}.${extension}`;
      await put(proof, file, {
        access: "public",
      });
    }

    const data = {
      t_client: { connect: { id: values.t_client_id } },
      date: new Date(new Date(values.date).setUTCHours(0, 0, 0, 0)),
      voucher: values.voucher,
      check: values.check,
      particulars: values.particulars,
      type: values.type,
      amount: values.amount,
      status: values.status,
      proof: proof,
    };

    if (proof) {
      delete data.proof;
    }

    await prisma.transaction.update({
      where: { id: values.id },
      data: data,
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath(url);
  const response: ActionResponse = {
    code: 200,
    message: `Updated ${model}`,
  };
  return response;
};

export const destroy = async (values: Destroy) => {
  const session = await cookies();
  const otp = session.get("otp")?.value;
  
  const schema = destroySchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (ufErrors) {
    const errors = formatErrors(ufErrors as Yup.ValidationError);

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: errors,
    };
    return response;
  }

  if (otp == values.otp) {
    try {
      const record = await prisma.transaction.findUnique({
        where: {
          id: values.id,
        },
      });
      const proof = record?.proof;

      const { blobs } = await list();
      const blob = blobs.find((blob) => {
        return proof == blob.pathname;
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

  revalidatePath(url);
  const response: ActionResponse = {
    code: 200,
    message: `Deleted ${model}`,
  };
  return response;
};

export const setStatus = async (values: { id: string; status: string }) => {
  const schema = setStatusSchema;

  try {
    await schema.validate(values, { abortEarly: false });
  } catch (ufErrors) {
    const errors = formatErrors(ufErrors as Yup.ValidationError);

    const response: ActionResponse = {
      code: 429,
      message: "Validation Error",
      errors: errors,
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

  revalidatePath(url);
  const response: ActionResponse = {
    code: 200,
    message: `${values.status == "Active" ? "Restored" : "Cancelled"} ${model}`,
  };
  return response;
};
