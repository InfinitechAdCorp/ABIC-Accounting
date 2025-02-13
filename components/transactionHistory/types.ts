import {
  Prisma,
  Account,
  TClient as PrismaTClient,
  Transaction as PrismaTransaction,
} from "@prisma/client";

export type TClient = PrismaTClient & {
  account?: Account;
  transactions?: Transaction[];
};

export type TClientRow = {
  id: string;
  name: string;
  transactions: string;
  starting_fund: string;
  running_balance: string;
  actions: string;
};

export type Transaction = Omit<PrismaTransaction, "amount"> & {
  t_client?: TClient | null;
  amount: number;
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
