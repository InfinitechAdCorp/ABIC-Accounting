"use server";

import prisma from "@/lib/db";

export const getCounts = async (accountID: string) => {
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

