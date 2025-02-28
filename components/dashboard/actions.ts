"use server";

import prisma from "@/lib/db";
import { cookies } from "next/headers";

export const getCounts = async () => {
  const session = await cookies();
  const accountID = session.get("accountID")?.value;

  const counts = {
    tClients: 0,
    transactions: 0,
    collections: 0,
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

    const collections = await prisma.collection.findMany({
      where: {
        account_id: accountID,
      },
    });

    counts.tClients = tClients.length;
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
