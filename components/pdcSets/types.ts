import {
  PDCSet as PrismaPDCSet,
  PDC as PrismaPDC,
  Account,
} from "@prisma/client";

export type PDCSet = Omit<PrismaPDCSet, "amount"> & {
  account?: Account | null;
  amount: number;
};

export type CreatePDCSet = PDCSet & { check: string };

export type PDC = PrismaPDC & {
  pdc_set?: PrismaPDCSet | null;
};
