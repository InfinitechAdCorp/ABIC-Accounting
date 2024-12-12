import {
  FormattedAccount,
  AccountWithTransactions,
  FormattedTransaction,
  TransactionWithAccount,
} from "@/components/transactionMonitoring/types";
import {
  FormattedClient,
  ClientWithContracts,
  FormattedContract,
  ContractWithClient,
} from "@/components/contractMonitoring/types";
import * as Yup from "yup";
import { toast } from "react-toastify";
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

export const formatAccounts = (accounts: AccountWithTransactions[]) => {
  const formattedAccounts: FormattedAccount[] = [];

  accounts.forEach((account) => {
    const formattedTransactions: FormattedTransaction[] = [];
    account.transactions.forEach((transaction) => {
      const formattedTransaction = {
        ...transaction,
        account_id: transaction.account_id as string,
        amount: transaction.amount.toNumber(),
      };
      formattedTransactions.push(formattedTransaction);
    });

    const formattedAccount = {
      ...account,
      starting_balance: account.starting_balance.toNumber(),
      transactions: formattedTransactions,
    };
    formattedAccounts.push(formattedAccount);
  });

  return formattedAccounts;
};

export const formatTransactions = (transactions: TransactionWithAccount[]) => {
  const formattedTransactions: FormattedTransaction[] = [];

  transactions.forEach((transaction) => {
    const account = transaction.account;

    const formattedTransaction = {
      ...transaction,
      account: {
        ...account,
        id: account?.id as string,
        name: account?.name as string,
        starting_balance: account?.starting_balance.toNumber() as number,
      },
      account_id: transaction.account_id as string,
      amount: transaction.amount.toNumber(),
    };
    formattedTransactions.push(formattedTransaction);
  });

  return formattedTransactions;
};

export const formatClients = (clients: ClientWithContracts[]) => {
  const formattedClients: FormattedClient[] = [];

  clients.forEach((client) => {
    const formattedContracts: FormattedContract[] = [];
    client.contracts.forEach((contract) => {
      const formattedContract = {
        ...contract,
        client_id: contract.client_id as string,
        tenant_price: contract.tenant_price?.toNumber(),
        owner_income: contract.owner_income?.toNumber(),
        abic_income: contract.abic_income?.toNumber(),
      };
      formattedContracts.push(formattedContract);
    });

    const formattedClient = {
      ...client,
      contracts: formattedContracts,
    };
    formattedClients.push(formattedClient);
  });

  return formattedClients;
};

export const formatContracts = (contracts: ContractWithClient[]) => {
  const formattedContracts: FormattedContract[] = [];

  contracts.forEach((contract) => {
    const client = contract.client;

    const formattedContract = {
      ...contract,
      client: {
        ...client,
        id: client?.id as string,
        name: client?.name as string,
      },
      client_id: contract.client_id as string,
      tenant_price: contract.tenant_price?.toNumber() as number,
      owner_income: contract.owner_income?.toNumber() as number,
      abic_income: contract.abic_income?.toNumber() as number,
    };

    formattedContracts.push(formattedContract);
  });

  return formattedContracts;
};

// Formatters

export const capitalize = (string: string) => {
  const capitalized = string.charAt(0).toUpperCase() + string.slice(1);
  return capitalized;
}

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
  if (date) {
    const localeDate = date.toLocaleDateString("en-CA");
    const formattedDate = parseDate(localeDate);
    return formattedDate;
  }
};

export const dateValueToDate = (dateValue: DateValue) => {
  const formattedDate = new Date(
    new Date(dateValue.toString()).setUTCHours(0)
  );
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
