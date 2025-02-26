import { Account, Listing as PrismaListing } from "@prisma/client";
import { Override } from "@/components/globals/types";

export type Listing = Override<
  PrismaListing,
  {
    account?: Account;
    list_price: number;
    total_price: number;
    display_format?: ListingDisplayFormat;
  }
>;

export type ListingDisplayFormat = {
  client: string;
  type: string;
  project: string;
  unit: string;
  res: string;
  terms: string;
  specialist: string;
  manager: string;
  list_price: string;
  total_price: string;
  status: string;
  source: string;
  extension: string;
  aging: string;
  closed: string;
};
