"use server";

import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { getAll as getAllTClients } from "@/components/transactionHistory/tClients/actions";
import { computeBalance } from "@/components/globals/utils";
import { ChartDatum } from "@/components/globals/types";
import { getMonthlyTransactions } from "@prisma/client/sql";

export const getCounts = async () => {
  const session = await cookies();
  const accountID = session.get("id")?.value;

  const counts = {
    tClients: 0,
    transactions: 0,
    ars: 0,
    bss: 0,
  };

  try {
    const tClients = await prisma.tClient.findMany({
      include: {
        transactions: {
          where: { account_id: accountID },
        },
      },
    });

    const transactions = await prisma.transaction.findMany({
      where: {
        account_id: accountID,
      },
    });

    const ars = await prisma.aR.findMany();

    const bss = await prisma.bS.findMany();

    counts.tClients = tClients.length;
    counts.transactions = transactions.length;
    counts.ars = ars.length;
    counts.bss = bss.length;
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      counts: counts,
    };
    return response;
  }

  const response = {
    code: 200,
    message: "Fetched Counts",
    counts: counts,
  };
  return response;
};

export const getCharts = async () => {
  const session = await cookies();
  const accountID = session.get("id")?.value;

  const clientTotals: ChartDatum[] = [];

  const { records: clients } = await getAllTClients();
  clients.forEach((client) => {
    const result = computeBalance(client.transactions || []);
    const clientTotal = {
      x: client.name,
      y: result.balance,
    };
    clientTotals.push(clientTotal);
  });

  clientTotals.sort((a, b) => {
    return a.y - b.y;
  });

  const today = new Date();
  const year = today.getFullYear();

  const ufMonthlyTransactions = await prisma.$queryRawTyped(
    getMonthlyTransactions(accountID!, year)
  );
  const monthlyTransactions = formatMonthlyData(ufMonthlyTransactions);

  const charts = {
    clientTotals: clientTotals,
    monthlyTransactions: monthlyTransactions,
  };

  const response = {
    code: 200,
    message: "Fetched Charts",
    charts: charts,
  };
  return response;
};

const formatMonthlyData = (records: getMonthlyTransactions.Result[]) => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (new Date().getMonth() > 5) {
    months = months.slice(6, 12);
  } else {
    months = months.slice(0, 6);
  }

  const chartData: ChartDatum[] = [];
  months.forEach((month) => {
    const chartDatum = { x: month, y: 0 };
    records.forEach((record) => {
      if (record.month?.startsWith(month)) {
        chartDatum.y = Number(record.count);
      }
    });
    chartData.push(chartDatum);
  });

  return chartData;
};
