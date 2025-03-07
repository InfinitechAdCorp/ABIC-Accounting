import { NextResponse } from "next/server";
import { setVoucher, formatDate } from "@/components/globals/utils";
import { getAll as getAllPDCSets } from "@/components/transactionHistory/pdcSets/actions";
import { differenceInDays } from "date-fns";
import prisma from "@/lib/db";
import { getAll } from "@/components/transactionHistory/transactions/actions";

type TransactionValues = {
  account_id: string | null,
  date: Date;
  check: string;
  particulars: string;
  type: string;
  amount: number;
};

export async function GET() {
  await checkPDCs();

  const response = {
    code: 200,
    message: `Checked PDCs`,
  };
  return NextResponse.json(response);
}

export const checkPDCs = async () => {
  const { records } = await getAllPDCSets();

  records.forEach((record) => {
    const pdcs = record.pdcs || [];

    for (const pdc of pdcs) {
      const today = new Date(new Date().setUTCHours(0, 0, 0, 0));
      const difference = differenceInDays(
        pdc.date.setUTCHours(0, 0, 0, 0),
        today
      );

      if (difference <= 0) {
        const particulars = `${record.name} - ${formatDate(pdc.date)}`;
        const transactionValues = {
          account_id: record.account_id,
          date: pdc.date,
          check: `${pdc.check}`,
          particulars: particulars,
          type: record.type,
          amount: record.amount,
        };
        saveAsTransaction(transactionValues);
      }
    }
  });
};

export const saveAsTransaction = async (
  values: TransactionValues
) => {
  const { records: transactions } = await getAll(values.account_id!);
  const last = transactions.find((transaction) => {
    return transaction.voucher;
  });

  const transaction = await prisma.transaction.findFirst({
    where: {
      particulars: values.particulars,
    },
  });

  if (!transaction) {
    await prisma.transaction.create({
      data: {
        ...values,
        voucher: setVoucher(last),
        status: "Active",
      },
    });
  }
};
