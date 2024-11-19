export type FormattedClient = {
  id: string;
  name: string;
  contracts: number;
}

export type FormattedContract = {
  id: string;
  client?: FormattedClient;
  client_id?: string;
  property: string;
  location: string;
  start: Date;
  end: Date;
  advance: number;
  deposit: number;
  tenant_price?: number;
  owner_income?: number;
  abic_income?: number;
  due_date: Date;
  payments: number;
}

export type ActionResponse = {
  code: number;
  message: string;
  errors?: {
    [key: string]: string;
  };
}
