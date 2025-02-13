"use server";

import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { Account } from "@prisma/client";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_USERNAME = process.env.SMTP_USERNAME;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const SMTP_RECEIVER = process.env.SMTP_RECEIVER;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: SMTP_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
});

export const sendOTP = async () => {
  const otp = `${crypto.randomInt(100000, 999999)}`;

  await transporter.sendMail({
    to: SMTP_RECEIVER,
    subject: "ABIC Accounting OTP",
    text: `Your One Time Password is: ${otp}`,
  });

  const session = await cookies();
  session.set("otp", otp);
};

type GetResponse = {
  code: number;
  message: string;
  record?: any;
  records?: any;
};

export const retry = async (action: () => Promise<GetResponse>, max = 3) => {
  let response;
  let count = 1;

  do {
    response = await action();
    ++count;
  } while ((!response.record || !response.records) || count <= max);

  return response;
};
