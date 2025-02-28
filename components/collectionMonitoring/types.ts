import {
  Prisma,
  Account,
  CClient as PrismaCClient,
  Collection as PrismaCollection,
} from "@prisma/client";
import { Override } from "@/components/globals/types";

export type CClient = PrismaCClient & {
  collections?: Collection[];
  display_format?: CClientDisplayFormat;
};

export type CClientDisplayFormat = {
  name: string;
  collections: string;
};

export type Collection = Override<
  PrismaCollection,
  {
    account?: Account;
    c_client?: CClient | null;
    tenant_price: number;
    owner_income: number;
    abic_income: number;
    display_format?: CollectionDisplayFormat;
  }
>;

export type CollectionDisplayFormat = {
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

export type CollectionCreateInput = Override<
  Prisma.CollectionCreateInput,
  {
    c_client_name?: string;
  }
>;
