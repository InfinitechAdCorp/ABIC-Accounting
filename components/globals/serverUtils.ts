"use server";

import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import crypto from "crypto";

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
  const otp = crypto.randomInt(100000, 999999).toString();
  await transporter.sendMail({
    to: SMTP_RECEIVER,
    subject: "ABIC Accounting OTP",
    text: `Your One Time Password is: ${otp}`,
  });

  const session = await cookies();
  session.set("otp", otp);
};
