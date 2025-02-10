import { Prisma, Account } from "@prisma/client";

export type CClient = {
  id: string;
  account?: Account;
  account_id?: string;
  collections?: Collection[];
  name: string;
};

export type CClientRow = {
  name: string;
  collections: string;
}

export type Collection = {
  id: string;
  c_client?: CClient;
  c_client_id?: string;
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

