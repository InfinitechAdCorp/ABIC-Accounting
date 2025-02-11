import { Account } from "@prisma/client";

export type Listing = {
  id: string,
  account?: Account,
  account_id?: string,
  client: string,
  type: string,
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
  extension?: Date,
  closed?: Date,
};

export type ListingRow = {
    client: string,
    type: string,
    project: string,
    unit: string,
    res: string,
    terms: string,
    consultant: string,
    manager: string,
    list_price: string,
    total_price: string,
    status: string,
    source: string,
    extension?: string,
    aging: string,
    closed?: string,
  };