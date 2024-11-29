import { Prisma } from "@prisma/client";

export type FormattedAccount = {
  id: string;
  name: string;
  starting_balance: number;
  transactions?: FormattedTransaction[];
};

export type FormattedTransaction = {
  id: string;
  date: Date;
  voucher: string;
  check: string;
  account?: FormattedAccount;
  account_id?: string;
  particulars: string;
  type: string;
  amount: number;
};

export type AccountWithTransactions = Prisma.AccountGetPayload<{
  include: {
    transactions: true;
  };
}>;

export type TransactionWithAccount = Prisma.TransactionGetPayload<{
  include: {
    account: true;
  };
}>;
