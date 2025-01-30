import {
  FormattedTransactionClient,
  TransactionClientWithTransactions,
  FormattedTransaction,
  TransactionWithTransactionClient,
} from "@/components/transactionHistory/types";
import {
  FormattedCollectionClient,
  CollectionClientWithCollections,
  FormattedCollection,
  CollectionWithCollectionClient,
} from "@/components/collectionMonitoring/types";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { ActionResponse } from "@/components/globals/types";
import { DateValue, parseDate } from "@internationalized/date";

// Event Handlers
export const handlePostSubmit = (
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
    }
    toast.error(response.message);
  }
};

// Data Formatters

export const formatTransactionClients = (
  transactionClients: TransactionClientWithTransactions[]
) => {
  const formattedTransactionClients: FormattedTransactionClient[] = [];

  if (transactionClients) {
    transactionClients.forEach((transactionClient) => {
      const formattedTransactions: FormattedTransaction[] = [];
      transactionClient.transactions.forEach((transaction) => {
        const formattedTransaction = {
          ...transaction,
          transaction_client_id: transaction.transaction_client_id as string,
          amount: transaction.amount.toNumber(),
        };
        formattedTransactions.push(formattedTransaction);
      });

      const formattedTransactionClient = {
        ...transactionClient,
        account_id: transactionClient.account_id as string,
        transactions: formattedTransactions,
      };
      formattedTransactionClients.push(formattedTransactionClient);
    });
  }

  return formattedTransactionClients;
};

export const formatTransactions = (
  transactions: TransactionWithTransactionClient[]
) => {
  const formattedTransactions: FormattedTransaction[] = [];

  transactions.forEach((transaction) => {
    const transactionClient = transaction.transaction_client;

    const formattedTransaction = {
      ...transaction,
      transaction_client: {
        ...transactionClient,
        id: transactionClient?.id as string,
        account_id: transactionClient?.account_id as string,
        name: transactionClient?.name as string,
      },
      transaction_client_id: transaction.transaction_client_id as string,
      amount: transaction.amount.toNumber(),
    };
    formattedTransactions.push(formattedTransaction);
  });

  return formattedTransactions;
};

export const formatCollectionClients = (
  collectionClients: CollectionClientWithCollections[]
) => {
  const formattedCollectionClients: FormattedCollectionClient[] = [];

  if (collectionClients) {
    collectionClients.forEach((collectionClient) => {
      const formattedCollections: FormattedCollection[] = [];
      collectionClient.collections.forEach((collection) => {
        const formattedCollection = {
          ...collection,
          collection_client_id: collection.collection_client_id as string,
          tenant_price: collection.tenant_price?.toNumber(),
          owner_income: collection.owner_income?.toNumber(),
          abic_income: collection.abic_income?.toNumber(),
        };
        formattedCollections.push(formattedCollection);
      });

      const formattedCollectionClient = {
        ...collectionClient,
        account_id: collectionClient.account_id as string,
        collections: formattedCollections,
      };
      formattedCollectionClients.push(formattedCollectionClient);
    });
  }

  return formattedCollectionClients;
};

export const formatCollections = (
  collections: CollectionWithCollectionClient[]
) => {
  const formattedCollections: FormattedCollection[] = [];

  collections.forEach((collection) => {
    const collectionClient = collection.collection_client;

    const formattedCollection = {
      ...collection,
      collection_client: {
        ...collectionClient,
        id: collectionClient?.id as string,
        account_id: collectionClient?.account_id as string,
        name: collectionClient?.name as string,
      },
      collection_client_id: collection.collection_client_id as string,
      tenant_price: collection.tenant_price?.toNumber() as number,
      owner_income: collection.owner_income?.toNumber() as number,
      abic_income: collection.abic_income?.toNumber() as number,
    };

    formattedCollections.push(formattedCollection);
  });

  return formattedCollections;
};

// Formatters

export const capitalize = (string: string) => {
  const capitalized = string.charAt(0).toUpperCase() + string.slice(1);
  return capitalized;
};

export const formatNumber = (number: number) => {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  }).format(number);
  return formattedNumber;
};

export const formatDate = (date: Date) => {
  const formattedDate = date.toLocaleDateString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
};

export const dateToDateValue = (date: Date) => {
  let formattedDate;

  if (date) {
    const dateComponents = date.toLocaleDateString("en-CA").split("-");
    dateComponents[0] = dateComponents[0].padStart(4, "0");
    formattedDate = parseDate(dateComponents.join("-"));
  }

  return formattedDate;
};

export const dateValueToDate = (dateValue: DateValue | null) => {
  let formattedDate;

  if (dateValue) {
    formattedDate = new Date(
      new Date(dateValue.toString()).setUTCHours(0, 0, 0, 0)
    );
  }

  return formattedDate;
};

export const formatErrors = (errors: Yup.ValidationError) => {
  const formattedErrors: { [key: string]: string } = {};
  errors.inner.forEach((error) => {
    if (error.path) {
      formattedErrors[error.path] = error.message;
    }
  });
  return formattedErrors;
};
