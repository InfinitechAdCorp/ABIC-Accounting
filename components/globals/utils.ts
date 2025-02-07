import {
  TClient,
  TClientWithTransactions,
  Transaction,
  TransactionWithTClient,
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

// Data Formatters

export const formatTClients = (ufRecords: TClientWithTransactions[]) => {
  const records: TClient[] = [];

  if (ufRecords) {
    ufRecords.forEach((ufRecord) => {
      const transactions: Transaction[] = [];
      ufRecord.transactions.forEach((ufTransaction) => {
        const transaction = {
          ...ufTransaction,
          t_client_id: ufTransaction.t_client_id as string,
          amount: ufTransaction.amount.toNumber(),
        };
        transactions.push(transaction);
      });

      const record = {
        ...ufRecord,
        account_id: ufRecord.account_id as string,
        transactions: transactions,
      };
      records.push(record);
    });
  }

  return records;
};

// export const displayFormatTransactionClients = (
//   columns: { key: string; name: string }[],
//   transactionClients: FormattedTransactionClient[]
// ) => {
//   const columnnNames: string[] = [];
//   columns.forEach((column) => {
//     columnnNames.push(column.name);
//   });

//   const rows = [];
//   transactionClients.forEach((transactionClient) => {
//     const row = {};
//     columns.forEach((column) => {
//       const key = column.key
//       let value;
//       switch (key) {
//         case "transactions":
//           value = transactionClient.transactions?.length;
//           break;
//         case "starting_fund":
//           value = 0;
//           break;
//         case "running_balance":
//           value = 0;
//           break;
//         default:
//           value =
//             transactionClient[key as keyof FormattedTransactionClient];
//           break;
//       }
//       row[key] = value;
//     });
//     rows.push(row);
//   });

//   const data = {
//     columnNames: columnnNames,
//     rows: rows,
//   };

//   return data;
// };

export const formatTransactions = (ufRecords: TransactionWithTClient[]) => {
  const records: Transaction[] = [];

  ufRecords.forEach((ufRecord) => {
    const tClient = ufRecord.t_client;

    const record = {
      ...ufRecord,
      t_client: {
        ...tClient,
        id: tClient?.id as string,
        account_id: tClient?.account_id as string,
        name: tClient?.name as string,
      },
      t_client_id: ufRecord.t_client_id as string,
      amount: ufRecord.amount.toNumber(),
    };
    records.push(record);
  });

  return records;
};

export const formatCClients = (ufRecords: CClientWithCollections[]) => {
  const records: CClient[] = [];

  if (ufRecords) {
    ufRecords.forEach((ufRecord) => {
      const collections: Collection[] = [];
      ufRecord.collections.forEach((ufCollection) => {
        const collection = {
          ...ufCollection,
          c_client_id: ufCollection.c_client_id as string,
          tenant_price: ufCollection.tenant_price?.toNumber(),
          owner_income: ufCollection.owner_income?.toNumber(),
          abic_income: ufCollection.abic_income?.toNumber(),
        };
        collections.push(collection);
      });

      const record = {
        ...ufRecord,
        account_id: ufRecord.account_id as string,
        collections: collections,
      };
      records.push(record);
    });
  }

  return records;
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
