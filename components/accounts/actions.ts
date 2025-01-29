"use server";

import prisma from "@/lib/db";

export const getAll = async () => {
  let accounts = [];

  try {
    accounts = await prisma.account.findMany();
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      accounts: [],
    };
    return response;
  }

  const response = {
    code: 200,
    message: "Fetched Accounts",
    accounts: accounts,
  };
  return response;
};
