"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "@/components/globals/types";
import { addMonths, getDate, setDate } from "date-fns";
import {
  create as createSchema,
  update as updateSchema,
  markAsPaid as markAsPaidSchema,
} from "@/components/contractMonitoring/contracts/schemas";
import { destroy as destroySchema } from "@/components/globals/schemas";
import { formatErrors } from "@/components/globals/utils";
import * as Yup from "yup";

export async function getAll() {
  let contracts = [];
  try {
    contracts = await prisma.contract.findMany({
      include: { client: true },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      contracts: [],
    };
    return response;
  }

  const response = {
    code: 200,
    message: "Fetched Contracts",
    contracts: contracts,
  };
  return response;
}

export async function create(values, actions) {
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
    await prisma.contract.create({
      data: {
        property: values.property,
        location: values.location,
        start: new Date(new Date(values.start).setUTCHours(0, 0, 0, 0)),
        end: new Date(new Date(values.end).setUTCHours(0, 0, 0, 0)),
        advance: parseInt(values.advance),
        deposit: parseInt(values.deposit),
        tenant_price: parseFloat(values.tenant_price),
        owner_income: parseFloat(values.owner_income),
        abic_income: parseFloat(values.abic_income),
        due: new Date(new Date(values.due).setUTCHours(0, 0, 0, 0)),
        client: { connect: { id: values.client_id } },
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/contracts");
  const response: ActionResponse = { code: 200, message: "Added Contract" };
  return response;
}

export async function update(values, actions) {
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
    await prisma.contract.update({
      where: { id: values.id },
      data: {
        property: values.property,
        location: values.location,
        start: new Date(new Date(values.start).setUTCHours(0, 0, 0, 0)),
        end: new Date(new Date(values.end).setUTCHours(0, 0, 0, 0)),
        advance: parseInt(values.advance),
        deposit: parseInt(values.deposit),
        tenant_price: parseFloat(values.tenant_price),
        owner_income: parseFloat(values.owner_income),
        abic_income: parseFloat(values.abic_income),
        due: new Date(new Date(values.due).setUTCHours(0, 0, 0, 0)),
        client: { connect: { id: values.client_id } },
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/contracts");
  const response: ActionResponse = { code: 200, message: "Updated Contract" };
  return response;
}

export async function destroy(values, actions) {
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
    await prisma.contract.delete({
      where: { id: values.id },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/contracts");
  const response: ActionResponse = { code: 200, message: "Deleted Contract" };
  return response;
}

export async function markAsPaid(values, actions) {
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
  const contract = await prisma.contract.findUnique({ where: { id: id } });

  const due_day = getDate(contract?.start as Date);
  let due = addMonths(contract?.due as Date, 1);
  due = setDate(due, due_day);

  try {
    await prisma.contract.update({
      where: { id: id },
      data: { due: due },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/contracts");
  const response: ActionResponse = {
    code: 200,
    message: "Successfully Made Payment",
  };
  return response;
}
