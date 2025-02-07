"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ActionResponse } from "@/components/globals/types";
import { addMonths, getDate, setDate } from "date-fns";
import {
  create as createSchema,
  update as updateSchema,
  markAsPaid as markAsPaidSchema,
} from "@/components/collectionMonitoring/collections/schemas";
import { destroy as destroySchema } from "@/components/globals/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";
import { formatCollections } from "@/components/globals/utils";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Destroy } from "@/components/globals/types";

type CollectionCreateInput = Prisma.CollectionCreateInput & {
  collection_client_id?: string;
};

export const getAll = async () => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value;

  let collections;

  try {
    collections = await prisma.collection.findMany({
      where: {
        collection_client: {
          account_id: accountID,
        },
      },
      include: {
        collection_client: true,
      },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      collections: [],
    };
    return response;
  }

  collections = formatCollections(collections || []);
  const response = {
    code: 200,
    message: "Fetched Collections",
    collections: collections,
  };
  return response;
};

export const create = async (values: CollectionCreateInput) => {
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
    await prisma.collection.create({
      data: {
        collection_client: { connect: { id: values.collection_client_id } },
        property: values.property,
        location: values.location,
        start: new Date(new Date(values.start).setUTCHours(0, 0, 0, 0)),
        end: new Date(new Date(values.end).setUTCHours(0, 0, 0, 0)),
        advance: Number(values.advance),
        deposit: Number(values.deposit),
        tenant_price: values.tenant_price,
        owner_income: values.owner_income,
        abic_income: values.abic_income,
        due: new Date(new Date(values.due).setUTCHours(0, 0, 0, 0)),
      },
    });
  } catch {
    const response: ActionResponse = {
      code: 500,
      message: "Server Error",
    };
    return response;
  }

  revalidatePath("/collection-monitoring/collections");
  const response: ActionResponse = { code: 200, message: "Added Collection" };
  return response;
};

export const update = async (values: CollectionCreateInput) => {
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
    await prisma.collection.update({
      where: { id: values.id },
      data: {
        collection_client: { connect: { id: values.collection_client_id } },
        property: values.property,
        location: values.location,
        start: new Date(new Date(values.start).setUTCHours(0, 0, 0, 0)),
        end: new Date(new Date(values.end).setUTCHours(0, 0, 0, 0)),
        advance: Number(values.advance),
        deposit: Number(values.deposit),
        tenant_price: values.tenant_price,
        owner_income: values.owner_income,
        abic_income: values.abic_income,
        due: new Date(new Date(values.due).setUTCHours(0, 0, 0, 0)),
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/collection-monitoring/collections");
  const response: ActionResponse = { code: 200, message: "Updated Collection" };
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
      await prisma.collection.delete({
        where: { id: values.id },
      });
    } catch {
      const response: ActionResponse = { code: 500, message: "Server Error" };
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


  revalidatePath("/collection-monitoring/collections");
  const response: ActionResponse = { code: 200, message: "Deleted Collection" };
  return response;
};

export const markAsPaid = async (values: { id: string }) => {
  const schema = markAsPaidSchema;

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

  const id = values.id;
  const collection = await prisma.collection.findUnique({ where: { id: id } });

  const due_day = getDate(collection?.start as Date);
  let due = addMonths(collection?.due as Date, 1);
  due = setDate(due, due_day);

  try {
    await prisma.collection.update({
      where: { id: id },
      data: { due: due },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/collection-monitoring/collections");
  const response: ActionResponse = {
    code: 200,
    message: "Successfully Made Payment",
  };
  return response;
};
