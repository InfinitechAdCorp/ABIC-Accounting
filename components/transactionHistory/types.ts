import { Prisma, Account } from "@prisma/client";

export type FormattedTransactionClient = {
  id: string;
  account?: Account;
  account_id?: string;
  transactions?: FormattedTransaction[];
  name: string;
};

export type DisplayFormatTransactionClient = {
  name: string,
  transactions: string,
  starting_balance: string,
  running_balance: string,
};

export type FormattedTransaction = {
  id: string;
  transaction_client?: FormattedTransactionClient;
  transaction_client_id?: string;
  date: Date;
  voucher: string;
  check: string;
  particulars: string;
  type: string;
  amount: number;
  status: string;
  proof: string;
};

export type TransactionClientWithTransactions = Prisma.TransactionClientGetPayload<{
  include: {
    transactions: true;
  };
}>;

export type TransactionWithTransactionClient = Prisma.TransactionGetPayload<{
  include: {
    transaction_client: true;
  };
}>;
