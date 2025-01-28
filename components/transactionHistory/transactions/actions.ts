"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import { revalidatePath } from "next/cache";
import {
  create as createSchema,
  update as updateSchema,
} from "@/components/transactionHistory/transactions/schemas";
import { destroy as destroySchema } from "@/components/globals/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";

type TransactionCreateInput = Prisma.TransactionCreateInput & {
  account_id?: string;
};

export const getAll = async () => {
  let transactions = [];

  try {
    transactions = await prisma.transaction.findMany({
      include: {
        transaction_client: true,
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

  const voucherExists = await prisma.transaction.findFirst({
    where: { voucher: values.voucher },
  });

  const checkExists = await prisma.transaction.findFirst({
    where: { check: values.check },
  });

  if (voucherExists && checkExists) {
    const response: ActionResponse = {
      code: 429,
      message: "Voucher and Check Numbers Are Already Taken",
    };
    return response;
  } else if (voucherExists || checkExists) {
    if (voucherExists) {
      const response: ActionResponse = {
        code: 429,
        message: "Voucher Number Is Already Taken",
      };
      return response;
    } else if (checkExists) {
      const response: ActionResponse = {
        code: 429,
        message: "Check Number Is Already Taken",
      };
      return response;
    }
  } else {
    try {
      await prisma.transaction.create({
        data: {
          date: new Date(new Date(values.date).setUTCHours(0, 0, 0, 0)),
          voucher: values.voucher,
          check: values.check,
          particulars: values.particulars,
          type: values.type,
          amount: values.amount,
          account: { connect: { id: values.account_id } },
        },
      });
    } catch {
      const response: ActionResponse = { code: 500, message: "Server Error" };
      return response;
    }
  }

  revalidatePath("/transactions");
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

  const voucherExists = await prisma.transaction.findFirst({
    where: { voucher: values.voucher },
  });

  const checkExists = await prisma.transaction.findFirst({
    where: { check: values.check },
  });

  const transaction = await prisma.transaction.findFirst({
    where: { id: values.id },
  });

  const validVoucher = !voucherExists || transaction?.voucher == values.voucher;
  const validCheck = !checkExists || transaction?.check == values.check;

  if (!validVoucher && !validCheck) {
    const response: ActionResponse = {
      code: 429,
      message: "Voucher and Check Numbers Are Already Taken",
    };
    return response;
  } else if (!validVoucher || !validCheck) {
    if (!validVoucher) {
      const response: ActionResponse = {
        code: 429,
        message: "Voucher Number Is Already Taken",
      };
      return response;
    } else if (!validCheck) {
      const response: ActionResponse = {
        code: 429,
        message: "Check Number Is Already Taken",
      };
      return response;
    }
  } else {
    try {
      await prisma.transaction.update({
        where: { id: values.id },
        data: {
          date: new Date(new Date(values.date).setUTCHours(0, 0, 0, 0)),
          voucher: values.voucher,
          check: values.check,
          particulars: values.particulars,
          type: values.type,
          amount: values.amount,
          account: { connect: { id: values.account_id } },
        },
      });
    } catch {
      const response: ActionResponse = { code: 500, message: "Server Error" };
      return response;
    }
  }

  revalidatePath("/transactions");
  const response: ActionResponse = {
    code: 200,
    message: "Updated Transaction",
  };
  return response;
};

export const destroy = async (values: { id: string }) => {
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

  try {
    await prisma.transaction.delete({
      where: { id: values.id },
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
};
