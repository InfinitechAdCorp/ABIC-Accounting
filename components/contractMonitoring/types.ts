import { Prisma } from "@prisma/client";

export type FormattedClient = {
  id: string;
  name: string;
  contracts?: number;
};

export type FormattedContract = {
  id: string;
  client?: FormattedClient;
  client_id?: string;
  property: string;
  location: string;
  start: string;
  end: string;
  advance: number;
  deposit: number;
  tenant_price?: number;
  owner_income?: number;
  abic_income?: number;
  due_date: string;
  payments: number;
  status: string;
  chipColor: string;
};

export type ClientWithContracts = Prisma.ClientGetPayload<{
  include: {
    contracts: true;
  };
}>;

export type ContractWithClient = Prisma.ContractGetPayload<{
  include: {
    client: true;
  };
}>;

