"use server";

import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { getAll as getAllTClients } from "@/components/transactionHistory/tClients/actions";
import { computeBalance } from "@/components/globals/utils";
import { ChartDatum } from "@/components/globals/types";

export const getCounts = async () => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value;

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

  const charts = {
    clientTotals: clientTotals,
  };

  const response = {
    code: 200,
    message: "Fetched Charts",
    charts: charts,
  };
  return response;
};
