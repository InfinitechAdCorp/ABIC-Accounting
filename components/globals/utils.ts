import { Transaction } from "@/components/transactionHistory/types";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { ActionResponse } from "@/components/globals/types";
import { DateValue, parseDate } from "@internationalized/date";
import { isAfter } from "date-fns";

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

// Formatters

export const capitalize = (ufString: string) => {
  const string = ufString.charAt(0).toUpperCase() + ufString.slice(1);
  return string;
};

export const formatNumber = (ufNumber: number) => {
  const number = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(ufNumber);
  return number;
};

export const formatDate = (ufDate: Date) => {
  let date;

  if (ufDate) {
    date = ufDate.toLocaleDateString("default", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

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

  if (ufErrors) {
    ufErrors.inner.forEach((ufError) => {
      if (ufError.path) {
        errors[ufError.path] = ufError.message;
      }
    });
  }

  return errors;
};

export const computeBalance = (records: Transaction[]) => {
  const result = {
    credit: 0,
    debit: 0,
    balance: 0,
  };

  if (records) {
    records.forEach((record) => {
      if (record.status != "Cancelled" && !isPending(record.date)) {
        if (record.type == "Credit") {
          result.credit += record.amount;
        } else {
          result.debit += record.amount;
        }
      }
    });
    result.balance = result.credit - result.debit;
  }

  return result;
};

export const isPending = (date: Date) => {
  let isPending = false;
  const today = new Date(new Date().setHours(0, 0, 0, 0));

  if (date) {
    isPending = isAfter(date.setHours(0, 0, 0, 0), today);
  }

  return isPending;
};

export const setVoucher = (transaction: Transaction) => {
  let id = 1;
  if (transaction) {
    id = Number(transaction.voucher) + 1;
  }
  const voucher = `${id}`.padStart(5, "0");
  return voucher;
};

export const getUniques = (records: any[], key: string) => {
  const values: string[] = [];
  records.forEach((record) => {
    values.push(record[key]);
  });

  const uniques: string[] = [...new Set(values)].sort();
  return uniques;
};
