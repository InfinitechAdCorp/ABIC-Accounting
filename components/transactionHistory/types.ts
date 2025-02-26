import {
  Prisma,
  Account,
  TClient as PrismaTClient,
  Transaction as PrismaTransaction,
} from "@prisma/client";
import { Override } from "@/components/globals/types";

export type TClient = PrismaTClient & {
  account?: Account;
  transactions?: Transaction[];
  display_format?: TClientDisplayFormat;
};

export type TClientDisplayFormat = {
  name: string;
  transactions: string;
  starting_fund: string;
  running_balance: string;
};

export type Transaction = Override<
  PrismaTransaction,
  {
    t_client?: TClient | null;
    amount: number;
    display_format?: TransactionDisplayFormat;
  }
>;

export type TransactionDisplayFormat = {
  date: string;
  voucher: string;
  check: string;
  client: string;
  particulars: string;
  credit: string;
  debit: string;
  status: string;
  proof: string;
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
