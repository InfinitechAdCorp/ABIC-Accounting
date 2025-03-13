"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import {
  create as createSchema,
  update as updateSchema,
  setStatus as setStatusSchema,
} from "@/components/transactionHistory/transactions/schemas";
import { destroy as destroySchema } from "@/components/globals/schemas";
import {
  formatErrors,
  formatDate,
  formatNumber,
  setVoucherNumber,
  daysFromToday,
} from "@/components/globals/utils";
import * as Yup from "yup";
import { Column, Destroy, ActionResponse } from "@/components/globals/types";
import {
  Transaction,
  TransactionDisplayFormat,
  TransactionWithTClient,
  TransactionCreateInput,
} from "@/components/transactionHistory/types";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { list, put, del } from "@vercel/blob";
import { ulid } from "ulidx";
import { differenceInDays } from "date-fns";

const model = "Transaction";
const url = "/transaction-history/transactions";

export const format = async (ufRecords: TransactionWithTClient[]) => {
  const records: Transaction[] = [];

  ufRecords.forEach((ufRecord) => {
    const record = {
      ...ufRecord,
      amount: Number(ufRecord.amount),
    };
    records.push(record);
  });

  return records;
};

export const displayFormat = async (
  columns: Column[],
  records: Transaction[]
) => {
  const { blobs } = await list();

  records.forEach((record) => {
    const display_format = {
      date: "",
      voucher_number: "",
      check_number: "",
      client: "",
      particulars: "",
      credit: "",
      debit: "",
      proof: "",
      status: "",
    };

    columns.forEach((column) => {
      const key = column.key;
      let value;

      switch (key) {
        case "date":
          value = formatDate(record[key as keyof Transaction] as Date);
          break;
        case "client":
          value = record.t_client?.name;
          break;
        case "credit":
          if (record.type == "Credit") {
            value = formatNumber(record.amount);
          } else {
            value = "";
          }
          break;
        case "debit":
          if (record.type == "Debit") {
            value = formatNumber(record.amount);
          } else {
            value = "";
          }
          break;
        case "status":
          value = record[key as keyof Transaction];
          if (value == "Active") value = "";
          break;
        case "proof":
          const proof = record[key as keyof Transaction];
          const blob = blobs.find((blob) => proof == blob.pathname);
          value = blob?.url;
          break;
        default:
          value = record[key as keyof Transaction];
          break;
      }

      if (value || value == 0) {
        display_format[key as keyof TransactionDisplayFormat] = `${value}`;
      }
    });

    record.display_format = display_format;
  });

  return records;
};

export const getAll = async () => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value;

  let records;

  try {
    records = await prisma.transaction.findMany({
      include: {
        t_client: true,
      },
      where: {
        account_id: accountID,
      },
      orderBy: [
        {
          date: "asc",
        },
        {
          created_at: "asc",
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

  records = await format(records || []);

  const response = {
    code: 200,
    message: `Fetched ${model}s`,
    records: records,
  };
  return response;
};

export const create = async (values: TransactionCreateInput) => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value;

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
    let proof;

    if (file) {
      const file = values.proof;
      const extension = (file as File).name.split(".").at(-1);
      proof = `${ulid()}.${extension}`;
      await put(proof, file, {
        access: "public",
      });
    }

    const t_client = {
      name: values.t_client_name as string,
    };

    let status = "Active";
    const days = daysFromToday(values.date);
    days <= 0 ? (status = "Active") : (status = "Pending");

    const data: Prisma.TransactionCreateInput = {
      account: { connect: { id: accountID } },
      t_client: {
        connectOrCreate: {
          where: t_client,
          create: t_client,
        },
      },
      date: new Date(new Date(values.date).setUTCHours(0, 0, 0, 0)),
      voucher_number: values.voucher_number || null,
      check_number: values.check_number || null,
      particulars: values.particulars,
      type: values.type,
      amount: values.amount,
      status: status,
      proof: proof,
    };

    if (!values.t_client_name) {
      delete data.t_client;
    }

    await prisma.transaction.create({
      data: data,
    });
  } catch (error) {
    const response: ActionResponse = {
      code: 500,
      message: "Server Error",
      error: error,
    };
    return response;
  }

  revalidatePath(url);
  const response: ActionResponse = { code: 200, message: `Added ${model}` };
  return response;
};

export const update = async (values: TransactionCreateInput) => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value;

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

      const extension = (file as File).name.split(".").at(-1);
      proof = `${ulid()}.${extension}`;
      await put(proof, file, {
        access: "public",
      });
    }

    const t_client = {
      name: values.t_client_name as string,
    };

    let status = values.status;
    if (status != "Cancelled") {
      const days = daysFromToday(values.date);
      days <= 0 ? (status = "Active") : (status = "Pending");
    }

    const data: Prisma.TransactionCreateInput = {
      account: { connect: { id: accountID } },
      t_client: {
        connectOrCreate: {
          where: t_client,
          create: t_client,
        },
      },
      date: new Date(new Date(values.date).setUTCHours(0, 0, 0, 0)),
      voucher_number: values.voucher_number || null,
      check_number: values.check_number || null,
      particulars: values.particulars,
      type: values.type,
      amount: values.amount,
      status: status,
      proof: proof,
    };

    if (!values.t_client_name) {
      delete data.t_client;
    }

    await prisma.transaction.update({
      where: { id: values.id },
      data: data,
    });
  } catch (error) {
    const response: ActionResponse = {
      code: 500,
      message: "Server Error",
      error: error,
    };
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

  let status = values.status;
  if (status != "Cancelled") {
    const record = await prisma.transaction.findUnique({
      where: {
        id: values.id,
      },
    });
    const days = daysFromToday(record!.date);
    days <= 0 ? (status = "Active") : (status = "Pending");
  }

  try {
    await prisma.transaction.update({
      where: { id: values.id },
      data: {
        status: status,
      },
    });
  } catch (error) {
    const response: ActionResponse = {
      code: 500,
      message: "Server Error",
      error: error,
    };
    return response;
  }

  revalidatePath(url);
  const response: ActionResponse = {
    code: 200,
    message: `${values.status} ${model}`,
  };
  return response;
};

export const checkTransactions = async () => {
  const ids: string[] = [];

  const { records } = await getAll();

  records.forEach((record) => {
    if (daysFromToday(record.date) <= 0 && record.status == "Pending") {
      ids.push(record.id);
    }
  });

  await prisma.transaction.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      status: "Active",
    },
  });
};

export const checkPDCs = async () => {
  const { records: transactions } = await getAll();
  const last = transactions.findLast((transaction) => {
    return transaction.voucher_number;
  });
  let voucherNumber = setVoucherNumber(last?.voucher_number || null);

  const data = [];

  const records = await prisma.pDC.findMany({
    include: {
      pdc_set: true,
    },
  });

  for (const record of records) {
    const today = new Date(new Date().setUTCHours(0, 0, 0, 0));
    const difference = differenceInDays(record.date, today);

    if (difference <= 0) {
      const particulars = `${record.pdc_set?.name} - ${formatDate(
        record.date
      )}`;

      const datum = {
        account_id: record.pdc_set!.account_id,
        date: record.date,
        voucher_number: `${voucherNumber}`,
        check_number: record.check_number,
        particulars: particulars,
        type: record.pdc_set!.type,
        amount: record.pdc_set!.amount,
        status: "Active",
      };

      data.push(datum);
      voucherNumber = setVoucherNumber(voucherNumber);
    }
  }

  await prisma.transaction.createMany({
    data: data,
    skipDuplicates: true,
  });
};
