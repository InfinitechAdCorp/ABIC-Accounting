"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "@/components/globals/types";
import { addMonths, getDate, setDate } from "date-fns";
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

export async function create(formData: FormData) {
  const schema = Yup.object().shape({
    client_id: Yup.string().required(),
    property: Yup.string().required(),
    location: Yup.string().required(),
    start: Yup.date().required(),
    end: Yup.date().required().min(Yup.ref("start")),
    advance: Yup.number().moreThan(-1),
    deposit: Yup.number().moreThan(-1),
    tenant_price: Yup.number().moreThan(-1),
    owner_income: Yup.number().moreThan(-1),
    abic_income: Yup.number().moreThan(-1),
    due: Yup.date().required().min(Yup.ref("start")).max(Yup.ref("end")),
  });

  const request = {
    client_id: formData.get("client_id") as string,
    property: formData.get("property") as string,
    location: formData.get("location") as string,
    start: formData.get("start") as string,
    end: formData.get("end") as string,
    advance: formData.get("advance") as string,
    deposit: formData.get("deposit") as string,
    tenant_price: formData.get("tenant_price") as string,
    owner_income: formData.get("owner_income") as string,
    abic_income: formData.get("abic_income") as string,
    due: formData.get("due") as string,
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
    await prisma.contract.create({
      data: {
        property: request.property,
        location: request.location,
        start: new Date(new Date(request.start).setUTCHours(0, 0, 0, 0)),
        end: new Date(new Date(request.end).setUTCHours(0, 0, 0, 0)),
        advance: parseInt(request.advance),
        deposit: parseInt(request.deposit),
        tenant_price: parseFloat(request.tenant_price),
        owner_income: parseFloat(request.owner_income),
        abic_income: parseFloat(request.abic_income),
        due: new Date(new Date(request.due).setUTCHours(0, 0, 0, 0)),
        client: { connect: { id: request.client_id } },
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

export async function update(formData: FormData) {
  const schema = Yup.object().shape({
    id: Yup.string().required(),
    client_id: Yup.string().required(),
    property: Yup.string().required(),
    location: Yup.string().required(),
    start: Yup.date().required(),
    end: Yup.date().required().min(Yup.ref("start")),
    advance: Yup.number().moreThan(-1),
    deposit: Yup.number().moreThan(-1),
    tenant_price: Yup.number().moreThan(-1),
    owner_income: Yup.number().moreThan(-1),
    abic_income: Yup.number().moreThan(-1),
    due: Yup.date().required().min(Yup.ref("start")).max(Yup.ref("end")),
  });

  const request = {
    id: formData.get("id") as string,
    client_id: formData.get("client_id") as string,
    property: formData.get("property") as string,
    location: formData.get("location") as string,
    start: formData.get("start") as string,
    end: formData.get("end") as string,
    advance: formData.get("advance") as string,
    deposit: formData.get("deposit") as string,
    tenant_price: formData.get("tenant_price") as string,
    owner_income: formData.get("owner_income") as string,
    abic_income: formData.get("abic_income") as string,
    due: formData.get("due") as string,
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
    await prisma.contract.update({
      where: { id: request.id },
      data: {
        property: request.property,
        location: request.location,
        start: new Date(new Date(request.start).setUTCHours(0, 0, 0, 0)),
        end: new Date(new Date(request.end).setUTCHours(0, 0, 0, 0)),
        advance: parseInt(request.advance),
        deposit: parseInt(request.deposit),
        tenant_price: parseFloat(request.tenant_price),
        owner_income: parseFloat(request.owner_income),
        abic_income: parseFloat(request.abic_income),
        due: new Date(new Date(request.due).setUTCHours(0, 0, 0, 0)),
        client: { connect: { id: request.client_id } },
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

export async function destroy(formData: FormData) {
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
    await prisma.contract.delete({
      where: { id: request.id },
    });
  } catch {
    const response: ActionResponse = { code: 500, message: "Server Error" };
    return response;
  }

  revalidatePath("/contracts");
  const response: ActionResponse = { code: 200, message: "Deleted Contract" };
  return response;
}

export async function markAsPaid(formData: FormData) {
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

  const id = request.id;
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

const formatErrors = (errors: Yup.ValidationError) => {
  const formattedErrors: { [key: string]: string } = {};
  errors.inner.forEach((error) => {
    if (error.path) {
      formattedErrors[error.path] = error.message;
    }
  });
  return formattedErrors;
};
