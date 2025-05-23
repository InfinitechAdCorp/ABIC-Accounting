"use server";

import prisma from "@/lib/db";
import { addMonths, getDate, setDate } from "date-fns";
import {
  create as createSchema,
  update as updateSchema,
  markAsPaid as markAsPaidSchema,
} from "@/components/collectionMonitoring/collections/schemas";
import { destroy as destroySchema } from "@/components/globals/schemas";
import * as Yup from "yup";
import { Column } from "@/components/globals/types";
import {
  Collection,
  CollectionDisplayFormat,
  CollectionWithCClient,
  CollectionCreateInput,
} from "@/components/collectionMonitoring/types";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ActionResponse, Destroy } from "@/components/globals/types";
import {
  formatDate,
  formatNumber,
  formatErrors,
  daysFromToday,
} from "@/components/globals/utils";
import { differenceInDays, differenceInMonths } from "date-fns";

const model = "Collection";
const url = "/collection-monitoring/collections";

export const format = async (ufRecords: CollectionWithCClient[]) => {
  const records: Collection[] = [];

  ufRecords.forEach((ufRecord) => {
    const record = {
      ...ufRecord,
      tenant_price: Number(ufRecord.tenant_price),
      owner_income: Number(ufRecord.owner_income),
      abic_income: Number(ufRecord.abic_income),
    };

    records.push(record);
  });

  return records;
};

export const displayFormat = async (
  columns: Column[],
  records: Collection[]
) => {
  records.forEach((record) => {
    const display_format = {
      client: "",
      property: "",
      location: "",
      start: "",
      end: "",
      advance: "",
      deposit: "",
      tenant_price: "",
      owner_income: "",
      abic_income: "",
      due: "",
      status: "",
      payments: "",
    };

    columns.forEach((column) => {
      const key = column.key;
      let value;

      switch (key) {
        case "client":
          value = record.c_client?.name;
          break;
        case "start":
        case "end":
        case "due":
          value = formatDate(record[key as keyof Collection] as Date);
          break;
        case "tenant_price":
        case "owner_income":
        case "abic_income":
          value = formatNumber(record[key as keyof Collection] as number);
          break;
        case "status":
          value = record[key as keyof Collection];
          if (value == "Active") {
            const today = new Date(new Date().setUTCHours(0, 0, 0, 0));
            const diff = differenceInDays(
              record.due.setUTCHours(0, 0, 0, 0),
              today
            );

            if (diff > 0) {
              value = `${diff} Days Remaining`;
            } else if (diff < 0) {
              value = `${diff} Days Past Due`.replace("-", "");
            } else if (diff == 0) {
              value = "Today";
            }
          }
          break;
        case "payments":
          value = differenceInMonths(record.due, record.start) - 1;
          if (value < 0) {
            value = 0;
          }
          break;
        default:
          value = record[key as keyof Collection];
          break;
      }

      if (value || value == 0) {
        display_format[key as keyof CollectionDisplayFormat] = `${value}`;
      }
    });

    record.display_format = display_format;
  });

  return records;
};

export const getAll = async () => {
  const session = await cookies();
  const accountID = session.get("id")?.value;

  let records;

  try {
    records = await prisma.collection.findMany({
      include: {
        c_client: true,
      },
      where: {
        account_id: accountID,
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
    message: `Fetched ${model}`,
    records: records,
  };
  return response;
};

export const create = async (values: CollectionCreateInput) => {
  const session = await cookies();
  const accountID = session.get("id")?.value;

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

  const c_client = {
    name: values.c_client_name as string,
  };

  try {
    await prisma.collection.create({
      data: {
        account: { connect: { id: accountID } },
        c_client: {
          connectOrCreate: {
            where: c_client,
            create: c_client,
          },
        },
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
        status: "Active",
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

export const update = async (values: CollectionCreateInput) => {
  const session = await cookies();
  const accountID = session.get("id")?.value;

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

  const c_client = {
    name: values.c_client_name as string,
  };

  let status = "Active";
  daysFromToday(values.end) < 0 ? (status = "Expired") : (status = "Active");

  try {
    await prisma.collection.update({
      where: { id: values.id },
      data: {
        account: { connect: { id: accountID } },
        c_client: {
          connectOrCreate: {
            where: c_client,
            create: c_client,
          },
        },
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
      await prisma.collection.delete({
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

export const markAsPaid = async (values: { id: string }) => {
  const schema = markAsPaidSchema;

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

  const id = values.id;
  const record = await prisma.collection.findUnique({ where: { id: id } });

  const day = getDate(record?.start as Date);
  let due = addMonths(record?.due as Date, 1);
  due = setDate(due, day);

  try {
    await prisma.collection.update({
      where: { id: id },
      data: { due: due },
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
    message: "Successfully Made Payment",
  };
  return response;
};

export const checkRecords = async () => {
  const ids: string[] = [];

  const { records } = await getAll();

  records.forEach((record) => {
    if (daysFromToday(record.end) < 0) {
      ids.push(record.id);
    }
  });

  await prisma.collection.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      status: "Expired",
    },
  });
};
