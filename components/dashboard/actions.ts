"use server";

import prisma from "@/lib/db";
import {
  getMonthlyTransactions,
  getMonthlyContracts,
} from "@prisma/client/sql";

export async function getCounts() {
  const counts = {
    accounts: 0,
    transactions: 0,
    clients: 0,
    contracts: 0,
  };

  try {
    const accounts = await prisma.account.aggregate({ _count: { id: true } });
    const transactions = await prisma.transaction.aggregate({
      _count: { id: true },
    });
    const clients = await prisma.client.aggregate({ _count: { id: true } });
    const contracts = await prisma.contract.aggregate({ _count: { id: true } });

    counts.accounts = accounts._count.id;
    counts.transactions = transactions._count.id;
    counts.clients = clients._count.id;
    counts.contracts = contracts._count.id;
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
}

export async function getCharts() {
  const accounts = await prisma.account.findMany({
    include: {
      _count: {
        select: {
          transactions: true,
        },
      },
    },
    orderBy: [
      {
        transactions: {
          _count: "desc",
        },
      },
    ],
    take: 7,
  });

  const clients = await prisma.client.findMany({
    include: {
      _count: {
        select: {
          contracts: true,
        },
      },
    },
    orderBy: [
      {
        contracts: {
          _count: "desc",
        },
      },
    ],
    take: 7,
  });

  type AccountWithTransactions = {
    name: string;
    transactions: number;
  };

  const accountsWithTransactions: AccountWithTransactions[] = [];
  accounts.map((account) => {
    const accountWithTransaction = {
      name: account.name,
      transactions: account._count.transactions,
    };
    accountsWithTransactions.push(accountWithTransaction);
  });

  type ClientWithContracts = {
    name: string;
    contracts: number;
  };

  const clientsWithContracts: ClientWithContracts[] = [];
  clients.map((client) => {
    const clientWithContracts = {
      name: client.name,
      contracts: client._count.contracts,
    };
    clientsWithContracts.push(clientWithContracts);
  });

  const today = new Date();
  const year = today.getFullYear();

  const monthlyTransactions = await prisma.$queryRawTyped(
    getMonthlyTransactions(year)
  );
  const monthlyContracts = await prisma.$queryRawTyped(
    getMonthlyContracts(year)
  );

  const formattedMonthlyTransactions = formatMonthlyData(monthlyTransactions);
  const formattedMonthlyContracts = formatMonthlyData(monthlyContracts);

  const charts = {
    accountsWithTransactions: accountsWithTransactions,
    clientsWithContracts: clientsWithContracts,
    monthlyTransactions: formattedMonthlyTransactions,
    monthlyContracts: formattedMonthlyContracts,
  };

  const response = {
    code: 200,
    message: "Fetched Charts",
    charts: charts,
  };
  return response;
}

const formatMonthlyData = (records: { month: string; count: number }[]) => {
  const formattedRecords = [];

  const today = new Date();

  const months = {
    firstHalf: ["Jan", "Feb", "March", "April", "May", "June"],
    secondHalf: ["July", "Aug", "Sept", "Oct", "Nov", "Dec"],
  };

  let half = "firstHalf";
  if (today.getMonth() > 5) {
    half = "secondHalf";
  }

  months[half].forEach((month) => {
    const monthData = { month: month, count: 0 };
    records.forEach((record) => {
      if (record.month?.startsWith(month)) {
        monthData.count = parseInt(record.count?.toString());
      }
    });
    formattedRecords.push(monthData);
  });
};
