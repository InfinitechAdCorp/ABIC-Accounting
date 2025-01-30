import { Prisma, Account } from "@prisma/client";

export type FormattedCollectionClient = {
  id: string;
  account?: Account;
  account_id?: string;
  collections?: FormattedCollection[];
  name: string;
};

export type FormattedCollection = {
  id: string;
  collection_client?: FormattedCollectionClient;
  collection_client_id?: string;
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

export type CollectionClientWithCollections = Prisma.CollectionClientGetPayload<{
  include: {
    collections: true;
  };
}>;

export type CollectionWithCollectionClient = Prisma.CollectionGetPayload<{
  include: {
    collection_client: true;
  };
}>;

