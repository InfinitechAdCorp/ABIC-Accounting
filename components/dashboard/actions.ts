"use server";

import prisma from "@/lib/db";
import { cookies } from "next/headers";

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
    counts.bss = bss.length
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
