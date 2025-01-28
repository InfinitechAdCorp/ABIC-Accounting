"use server";

import prisma from "@/lib/db";
import {
  getMonthlyTransactions,
  getMonthlyCollections,
} from "@prisma/client/sql";

export const getCounts = async () => {
  const counts = {
    clients: 0,
    transactions: 0,
    collections: 0,
  };

  try {
    const clients = await prisma.transactionClient.aggregate({
      _count: { id: true },
    });
    const transactions = await prisma.transaction.aggregate({
      _count: { id: true },
    });
    const collections = await prisma.collection.aggregate({
      _count: { id: true },
    });

    counts.clients = clients._count.id;
    counts.transactions = transactions._count.id;
    counts.collections = collections._count.id;
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
  const transaction_clients = await prisma.transactionClient.findMany({
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

  const collection_clients = await prisma.collectionClient.findMany({
    include: {
      _count: {
        select: {
          collections: true,
        },
      },
    },
    orderBy: [
      {
        collections: {
          _count: "desc",
        },
      },
    ],
    take: 7,
  });

  type ClientWithTransactions = {
    name: string;
    count: number;
  };

  const clientsWithTransactions: ClientWithTransactions[] = [];
  transaction_clients.map((transaction_client) => {
    const clientWithTransactions = {
      name: transaction_client.name,
      count: transaction_client._count.transactions,
    };
    clientsWithTransactions.push(clientWithTransactions);
  });

  type ClientWithCollections = {
    name: string;
    count: number;
  };

  const clientsWithCollections: ClientWithCollections[] = [];
  collection_clients.map((collection_client) => {
    const clientWithCollections = {
      name: collection_client.name,
      count: collection_client._count.collections,
    };
    clientsWithCollections.push(clientWithCollections);
  });

  const today = new Date();
  const year = today.getFullYear();

  const monthlyTransactions = await prisma.$queryRawTyped(
    getMonthlyTransactions(year)
  );
  const monthlyCollections = await prisma.$queryRawTyped(
    getMonthlyCollections(year)
  );

  const formattedMonthlyTransactions = formatMonthlyData(monthlyTransactions);
  const formattedMonthlyCollections = formatMonthlyData(monthlyCollections);

  const charts = {
    clientsWithTransactions: clientsWithTransactions,
    clientsWithCollections: clientsWithCollections,
    monthlyTransactions: formattedMonthlyTransactions,
    monthlyCollections: formattedMonthlyCollections,
  };

  const response = {
    code: 200,
    message: "Fetched Charts",
    charts: charts,
  };
  return response;
};

const formatMonthlyData = (
  records: getMonthlyTransactions.Result[] | getMonthlyCollections.Result[]
) => {
  type MonthData = {
    month: string;
    count: number;
  };
  type Half = "firstHalf" | "secondHalf";

  const months = {
    firstHalf: ["Jan", "Feb", "March", "April", "May", "June"],
    secondHalf: ["July", "Aug", "Sept", "Oct", "Nov", "Dec"],
  };

  let half = "firstHalf";
  if (new Date().getMonth() > 5) {
    half = "secondHalf";
  }

  const formattedRecords: MonthData[] = [];
  months[half as Half].forEach((month) => {
    const monthData = { month: month, count: 0 };
    records.forEach((record) => {
      if (record.month?.startsWith(month)) {
        monthData.count = record.count as number;
      }
    });
    formattedRecords.push(monthData);
  });

  return formattedRecords;
};
