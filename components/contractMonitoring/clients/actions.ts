"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Client, ActionResponse } from "@/components/contractMonitoring/types";
import { differenceInMonths } from "date-fns";
import * as Yup from "yup";

export async function addClient(formData: FormData) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
  });

  const request: Prisma.ClientCreateInput = {
    name: formData.get("name") as string,
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
    await prisma.client.create({ data: { ...request } });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/clients");
  const response: ActionResponse = { code: 200, message: "Added Client" };
  return response;
}

export async function getClients() {
  let clients: Client[] = [];

  try {
    clients = await prisma.client.findMany({
      include: { contracts: true },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      clients: clients,
    };
    return response;
  }

  clients.map((client) => {
    client.contracts.map((contract) => {
      contract.tenant_price = (
        contract.tenant_price as Prisma.Decimal
      ).toNumber();
      contract.owner_income = (
        contract.owner_income as Prisma.Decimal
      ).toNumber();
      contract.abic_income = (
        contract.abic_income as Prisma.Decimal
      ).toNumber();
      contract.payments_count =
        differenceInMonths(contract.due_date, contract.start) - 1;
    });
  });

  const response = { code: 200, message: "Fetched Clients", clients: clients };
  return response;
}

export async function deleteClient(formData: FormData) {
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
    await prisma.client.delete({
      where: { id: request.id },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/clients");
  const response: ActionResponse = { code: 200, message: "Deleted Client" };
  return response;
}

export async function updateClient(formData: FormData) {
  const schema = Yup.object().shape({
    id: Yup.string().required(),
    name: Yup.string().required(),
  });

  const request: Prisma.ClientCreateInput = {
    id: formData.get("id") as string,
    name: formData.get("name") as string,
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
    await prisma.client.update({
      where: {
        id: request.id,
      },
      data: {
        name: request.name,
      },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/clients");
  const response: ActionResponse = { code: 200, message: "Updated Client" };
  return response;
}
