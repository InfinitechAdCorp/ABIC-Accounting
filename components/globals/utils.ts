import {
  Transaction,
} from "@/components/transactionHistory/types";
import {
  CClient,
  CClientWithCollections,
  Collection,
  CollectionWithCClient,
} from "@/components/collectionMonitoring/types";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { ActionResponse } from "@/components/globals/types";
import { DateValue, parseDate } from "@internationalized/date";

// Event Handlers

export const onPostSubmit = (
  response: ActionResponse,
  actions: { resetForm: () => void },
  onClose: () => void
) => {
  if (response.code == 200) {
    actions.resetForm();
    toast.success(response.message);
    onClose();
  } else {
    if (response.code == 429) {
      console.log(response.errors);
    } else {
      console.log(response.error);
    }
    toast.error(response.message);
  }
};






export const formatCollections = (ufRecords: CollectionWithCClient[]) => {
  const records: Collection[] = [];

  ufRecords.forEach((ufRecord) => {
    const cClient = ufRecord.c_client;

    const record = {
      ...ufRecord,
      c_client: {
        ...cClient,
        id: cClient?.id as string,
        account_id: cClient?.account_id as string,
        name: cClient?.name as string,
      },
      c_client_id: ufRecord.c_client_id as string,
      tenant_price: ufRecord.tenant_price?.toNumber() as number,
      owner_income: ufRecord.owner_income?.toNumber() as number,
      abic_income: ufRecord.abic_income?.toNumber() as number,
    };

    records.push(record);
  });

  return records;
};

// Formatters

export const capitalize = (ufString: string) => {
  const string = ufString.charAt(0).toUpperCase() + ufString.slice(1);
  return string;
};

export const formatNumber = (ufNumber: number) => {
  const number = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  }).format(ufNumber);
  return number;
};

export const formatDate = (ufDate: Date) => {
  const date = ufDate.toLocaleDateString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return date;
};

export const dateToDateValue = (date: Date) => {
  let dateValue;

  if (date) {
    const components = date.toLocaleDateString("en-CA").split("-");
    components[0] = components[0].padStart(4, "0");
    dateValue = parseDate(components.join("-"));
  }

  return dateValue;
};

export const dateValueToDate = (dateValue: DateValue | null) => {
  let date;

  if (dateValue) {
    date = new Date(new Date(dateValue.toString()).setUTCHours(0, 0, 0, 0));
  }

  return date;
};

export const formatErrors = (ufErrors: Yup.ValidationError) => {
  const errors: { [key: string]: string } = {};
  ufErrors.inner.forEach((ufError) => {
    if (ufError.path) {
      errors[ufError.path] = ufError.message;
    }
  });
  return errors;
};

export const computeBalance = (records: Transaction[]) => {
  let total = 0;
  records.forEach((record) => {
    if (record.status != "Cancelled") {
      if (record.type == "Credit") {
        total += record.amount;
      } else {
        total -= record.amount;
      }
    }
  });
  return total;
};
