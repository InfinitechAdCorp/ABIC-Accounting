"use server";

import prisma from "@/lib/db";
import { cookies } from "next/headers";

export const getCounts = async () => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value
  
  const counts = {
    transactionClients: 0,
    transactions: 0,
    collections: 0,
  };

  try {
    const account = await prisma.account.findUnique({
      where: { id: accountID },
      include: {
        transaction_clients: true,
      },
    });

    const transactions = await prisma.transaction.findMany({
      where: {
        transaction_client: {
          account_id: accountID,
        },
      },
    });

    const collections = await prisma.collection.findMany({
      where: {
        collection_client: {
          account_id: accountID,
        },
      },
    });

    counts.transactionClients = account?.transaction_clients.length as number;
    counts.transactions = transactions.length;
    counts.collections = collections.length;
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
