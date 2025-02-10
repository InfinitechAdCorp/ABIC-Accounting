"use server";

import prisma from "@/lib/db";

export const getAll = async () => {
  let records;

  try {
    records = await prisma.aR.findMany();
  } catch {
    const response = {
      code: 500,
      message: "Server Error",
      records: [],
    };
    return response;
  }

  const response = {
    code: 200,
    message: `Fetched Acknowledgement Receipts`,
    records: records,
  };
  return response;
};
