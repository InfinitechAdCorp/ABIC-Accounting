import { toast } from "react-toastify";
import { ActionResponse } from "@/components/globals/types";
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
import { differenceInMonths, differenceInDays } from "date-fns";

// Event Handlers

export const handleSubmit = (
  action: (formData: FormData) => Promise<any>,
  formData: FormData,
  onClose: () => void
) => {
  action(formData).then((response) => handlePostSubmit(response, onClose));
};

export const handlePostSubmit = (
  response: ActionResponse,
  onClose: () => void
) => {
  if (response.code == 200) {
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
    let balance = account.balance.toNumber();
    const transactions = account.transactions;
    transactions.forEach((transaction) => {
      const amount = transaction.amount.toNumber();
      if (transaction.type == "Credit") {
        balance += amount;
      } else {
        balance -= amount;
      }
    });

    const formattedAccount = {
      ...account,
      balance: balance,
      transactions: transactions.length,
    };
    formattedAccounts.push(formattedAccount);
  });

  return formattedAccounts;
};

export const formatTransactions = (transactions: TransactionWithAccount[]) => {
  const formattedTransactions: FormattedTransaction[] = [];

  transactions.forEach((transaction) => {
    const account = transaction.account;
    const balance = account?.balance.toNumber();
    const amount = transaction.amount.toNumber();

    const formattedTransaction = {
      ...transaction,
      account: {
        ...account,
        id: account?.id as string,
        name: account?.name as string,
        balance: balance as number,
      },
      account_id: transaction.account_id as string,
      amount: amount,
    };
    formattedTransactions.push(formattedTransaction);
  });

  return formattedTransactions;
};

export const formatClients = (clients: ClientWithContracts[]) => {
  const formattedClients: FormattedClient[] = [];

  clients.forEach((client) => {
    const contracts = client.contracts.length;

    const formattedClient = {
      ...client,
      contracts: contracts,
    };
    formattedClients.push(formattedClient);
  });

  return formattedClients;
};

export const formatContracts = (contracts: ContractWithClient[]) => {
  const formattedContracts: FormattedContract[] = [];

  contracts.forEach((contract) => {
    const client = contract.client;
    const tenant_price = contract.tenant_price?.toNumber();
    const owner_income = contract.owner_income?.toNumber();
    const abic_income = contract.abic_income?.toNumber();

    let payments = differenceInMonths(contract.due, contract.start) - 1;
    if (payments < 0) {
      payments = 0;
    }
    const { status, chipColor } = getStatus(contract.due);

    const formattedContract = {
      ...contract,
      client: {
        ...client,
        id: client?.id as string,
        name: client?.name as string,
      },
      client_id: contract.client_id as string,
      start: contract.start,
      end: contract.end,
      tenant_price: tenant_price,
      owner_income: owner_income,
      abic_income: abic_income,
      due: contract.due,
      payments: payments,
      status: status as string,
      chipColor: chipColor as string,
    };
    formattedContracts.push(formattedContract);
  });

  return formattedContracts;
};

const getStatus = (due: Date) => {
  const today = new Date(new Date().setUTCHours(0, 0, 0, 0));
  const difference = differenceInDays(due, today);

  let status;
  let chipColor;
  if (difference > 0) {
    status = `${difference} Days Remaining`;
    chipColor = "success";
  } else if (difference < 0) {
    status = `${difference} Days Past Due`.replace("-", "");
    chipColor = "danger";
  } else if (difference == 0) {
    status = "Today";
    chipColor = "primary";
  }

  const data = {
    status: status,
    chipColor: chipColor,
  };

  return data;
};

// Formatters

export function capitalize(string: string) {
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
