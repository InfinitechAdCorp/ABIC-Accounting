"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "@/components/globals/types";
import * as Yup from "yup";

export async function getClients() {
  let clients = [];

  try {
    clients = await prisma.client.findMany({
      include: { contracts: true },
    });
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      clients: [],
    };
    return response;
  }

  const response = { code: 200, message: "Fetched Clients", clients: clients };
  return response;
}

export async function addClient(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const schema = Yup.object().shape({
    name: Yup.string().required(),
  });

  const request: Prisma.ClientCreateInput = {
    name: formData.get("name") as string,
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
    await prisma.client.create({ data: { ...request } });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/clients");
  const response: ActionResponse = { code: 200, message: "Added Client" };
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
    const formattedErrors = formatErrors(errors as Yup.ValidationError);

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
    const formattedErrors = formatErrors(errors as Yup.ValidationError);

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

const formatErrors = (errors: Yup.ValidationError) => {
  const formattedErrors: { [key: string]: string } = {};
  errors.inner.forEach((error) => {
    if (error.path) {
      formattedErrors[error.path] = error.message;
    }
  });
  return formattedErrors;
};
