import {
  Prisma,
  PDCSet as PrismaPDCSet,
  PDC as PrismaPDC,
  Account,
} from "@prisma/client";
import { Override } from "@/components/globals/types";

export type PDCSet = Override<
  PrismaPDCSet,
  { account?: Account | null; amount: number }
>;

export type CreatePDCSet = Prisma.PDCSetCreateInput & {
  check: string;
};

export type PDC = PrismaPDC & {
  pdc_set?: PrismaPDCSet | null;
};
