import { Prisma } from "@prisma/client";

export const accounts: Prisma.AccountCreateInput[] = [
  {
    name: "SCB 443",
    th_access: true,
    cm_access: true,
  },
  {
    name: "SCB 483",
    th_access: false,
    cm_access: false,
  },
  {
    name: "SCB 202",
    th_access: true,
    cm_access: false,
  },
];