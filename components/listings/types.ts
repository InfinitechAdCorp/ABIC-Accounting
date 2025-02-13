import { Account } from "@prisma/client";

export type Listing = {
  id: string;
  account?: Account;
  account_id: string | null;
  client: string;
  type: string;
  project: string;
  unit: string;
  res: Date;
  terms: string;
  consultant: string;
  manager: string;
  list_price: number;
  total_price: number;
  status: string;
  source: string;
  extension: Date | null;
  closed: Date | null;
};

export type ListingRow = {
  id: string;
  client: string;
  type: string;
  project: string;
  unit: string;
  res: string;
  terms: string;
  consultant: string;
  manager: string;
  list_price: string;
  total_price: string;
  status: string;
  source: string;
  extension?: string;
  aging: string;
  closed?: string;
  actions: string;
};
