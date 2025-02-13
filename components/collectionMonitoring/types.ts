import { Prisma, Account } from "@prisma/client";

export type CClient = {
  id: string;
  account?: Account;
  account_id: string | null;
  collections?: Collection[];
  name: string;
};

export type CClientRow = {
  id: string;
  name: string;
  collections: string;
  actions: string;
};

export type Collection = {
  id: string;
  c_client?: CClient;
  c_client_id: string | null;
  property: string;
  location: string;
  start: Date;
  end: Date;
  advance: number;
  deposit: number;
  tenant_price?: number;
  owner_income?: number;
  abic_income?: number;
  due: Date;
};

export type CollectionRow = {
  id: string,
  client: string;
  property: string;
  location: string;
  start: string;
  end: string;
  advance: string;
  deposit: string;
  tenant_price: string;
  owner_income: string;
  abic_income: string;
  due: string;
  status: string;
  payments: string;
  actions: string;
};

export type CClientWithCollections = Prisma.CClientGetPayload<{
  include: {
    collections: true;
  };
}>;

export type CollectionWithCClient = Prisma.CollectionGetPayload<{
  include: {
    c_client: true;
  };
}>;
