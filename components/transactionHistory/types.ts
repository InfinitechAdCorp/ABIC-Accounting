import { Prisma, Account } from "@prisma/client";

export type TClient = {
  id: string;
  account?: Account;
  account_id?: string;
  transactions?: Transaction[];
  name: string;
};

export type TClientRow = {
  id: string;
  name: string;
  transactions: string;
  starting_fund: string;
  running_balance: string;
  actions: string;
};

export type Transaction = {
  id: string;
  t_client?: TClient;
  t_client_id?: string;
  date: Date;
  voucher: string;
  check: string;
  particulars: string;
  type: string;
  amount: number;
  status: string;
  proof: string;
};

export type TransactionRow = {
  id: string;
  date: string;
  voucher: string;
  check: string;
  client: string;
  particulars: string;
  credit: string;
  debit: string;
  status: string;
  proof: string;
  actions: string;
};

export type TClientWithTransactions = Prisma.TClientGetPayload<{
  include: {
    transactions: true;
  };
}>;

export type TransactionWithTClient = Prisma.TransactionGetPayload<{
  include: {
    t_client: true;
  };
}>;
