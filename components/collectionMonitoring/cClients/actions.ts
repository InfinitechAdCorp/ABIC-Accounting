"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import {
  create as createSchema,
  update as updateSchema,
} from "@/components/collectionMonitoring/cClients/schemas";
import { destroy as destroySchema } from "@/components/globals/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";
import { Column } from "@/components/globals/types";
import {
  CClient,
  CClientDisplayFormat,
  CClientWithCollections,
  Collection,
} from "@/components/collectionMonitoring/types";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Destroy } from "@/components/globals/types";

const model = "Client";
const url = "/collection-monitoring/clients";

export const format = async (ufRecords: CClientWithCollections[]) => {
  const records: CClient[] = [];

  if (ufRecords) {
    ufRecords.forEach((ufRecord) => {
      const collections: Collection[] = [];
      ufRecord.collections.forEach((ufCollection) => {
        const collection = {
          ...ufCollection,
          tenant_price: Number(ufCollection.tenant_price),
          owner_income: Number(ufCollection.owner_income),
          abic_income: Number(ufCollection.abic_income),
        };
        collections.push(collection);
      });

      const record = {
        ...ufRecord,
        collections: collections,
      };
      records.push(record);
    });
  }

  return records;
};

export const displayFormat = async (columns: Column[], records: CClient[]) => {
  records.forEach((record) => {
    const display_format = {
      name: "",
      collections: "",
    };

    columns.forEach((column) => {
      const key = column.key;
      let value;

      switch (key) {
        case "collections":
          value = record.collections?.length;
          break;
        default:
          value = record[key as keyof CClient];
          break;
      }

      if (value || value == 0) {
        display_format[key as keyof CClientDisplayFormat] = `${value}`;
      }
    });

    record.display_format = display_format;
  });

  return records;
};

export const getAll = async () => {
  const session = await cookies();
  const accountID = session.get("id")?.value || "";

  let records;

  try {
    records = await prisma.cClient.findMany({
      include: {
        collections: { where: { account_id: accountID } },
      },
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

export const get = async (id: string) => {
  let record;

  try {
    record = await prisma.cClient.findUnique({
      where: { id: id },
      include: {
        collections: true,
      },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      record: null,
    };
    return response;
  }

  if (record) {
    record = (await format([record]))[0];
    const response = {
      code: 200,
      message: `Fetched ${model}`,
      record: record,
    };
    return response;
  } else {
    const response = {
      code: 404,
      message: `${model} Not Found`,
      record: null,
    };
    return response;
  }
};

export const create = async (values: Prisma.CClientCreateInput) => {
  const session = await cookies();
  const accountID = session.get("id")?.value || "";

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
    await prisma.cClient.create({
      data: {
        name: values.name,
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
  const response: ActionResponse = { code: 200, message: `Added ${model}` };
  return response;
};

export const update = async (values: Prisma.CClientCreateInput) => {
  const session = await cookies();
  const accountID = session.get("id")?.value || "";

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
    await prisma.cClient.update({
      where: {
        id: values.id,
      },
      data: {
        name: values.name,
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
  const response: ActionResponse = { code: 200, message: `Updated ${model}` };
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
      await prisma.cClient.delete({
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
  const response: ActionResponse = { code: 200, message: `Deleted ${model}` };
  return response;
};
