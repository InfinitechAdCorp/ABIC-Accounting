"use server";

import prisma from "@/lib/db";

export const getAllARs = async () => {
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

export const getAllBSs = async () => {
  let records;

  try {
    records = await prisma.bS.findMany();
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
    message: `Fetched Billing Statements`,
    records: records,
  };
  return response;
};
