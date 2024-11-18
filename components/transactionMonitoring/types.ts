export type FormattedAccount = {
    id: string;
    name: string;
    balance: number;
    transactions: number;
}
  
export type FormattedTransaction = {
    id: string;
    date: Date;
    voucher: string;
    check: string;
    account?: FormattedAccount;
    account_id?: string;
    particulars: string;
    type: string;
    amount: number;
}

export type ActionResponse = {
    code: number;
    message: string;
    errors?: {
        [key: string]: string
    };
}