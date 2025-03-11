import {
  Prisma,
  Account,
  TClient as PrismaTClient,
  Transaction as PrismaTransaction,
} from "@prisma/client";
import { Override } from "@/components/globals/types";

export type TClient = PrismaTClient & {
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
    account?: Account;
    t_client?: TClient | null;
    amount: number;
    display_format?: TransactionDisplayFormat;
  }
>;

export type TransactionDisplayFormat = {
  date: string;
  voucher_number: string;
  check_number: string;
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

export type TransactionCreateInput = Override<
  Prisma.TransactionCreateInput,
  {
    t_client_name?: string;
    proof: string | File;
  }
>;
