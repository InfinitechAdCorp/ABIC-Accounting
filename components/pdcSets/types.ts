import {
  Prisma,
  PDCSet as PrismaPDCSet,
  PDC as PrismaPDC,
  Account,
} from "@prisma/client";
import { Override } from "@/components/globals/types";

export type PDCSet = Override<
  PrismaPDCSet,
  { account?: Account | null; pdcs?: PDC[]; amount: number, display_format?: PDCSetDisplayFormat }
>;

export type PDCSetDisplayFormat = {
  name: string;
  pay_to: string;     
  start: string;      
  end: string;        
  pdcs: string;
  type: string;       
  total: string;     
} 

export type PDC = PrismaPDC & {
  pdc_set?: PrismaPDCSet | null;
};

export type PDCSetCreateInput = Prisma.PDCSetCreateInput & {
  check: string;
};

export type PDCSetWithPDCs = Prisma.PDCSetGetPayload<{
  include: {
    pdcs: true;
  };
}>;