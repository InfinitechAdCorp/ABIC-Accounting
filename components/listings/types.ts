import { Account } from "@prisma/client";

export type Listing = {
  id: string,
  account?: Account,
  account_id?: string,
  project: string,
  unit: string,
  res: Date,
  terms: string,
  consultant: string,
  manager: string,
  list_price: number,
  total_price: number,
  status: string,
  source: string,
  extension: Date,
  closed: Date,
  type: string,
};