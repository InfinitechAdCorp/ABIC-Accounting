import { PDC as PrismaPDC, Account } from "@prisma/client";

export type PDCSet = {
  name: string;
  pay_to: string;
  start: Date | string;
  end: Date | string;
  check: string;
  type: string;
  amount: number;
};

export type PDC = Omit<PrismaPDC, "amount"> & {
  account?: Account | null;
  amount: number;
};
