import { Prisma } from "@prisma/client";
import { accounts } from "@/prisma/accounts";

export const listings: Prisma.ListingCreateInput[] = [
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    client: "Mary Rose",
    type: "Sale",
    project: "Calathea Place",
    unit: "607 Marantina",
    res: "2024-12-01T00:00:00.000Z",
    terms: "50-50 bf",
    consultant: "Joyce Roa",
    manager: "Aldrin Tapia",
    list_price: "3264000",
    total_price: "2937600",
    status: "Closed",
    source: "Walk In",
    extension: "2025-02-10T00:00:00.000Z",
    closed: "2025-02-01T00:00:00.000Z",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    client: "Yeonseo Oh",
    type: "Sale",
    project: "Alea",
    unit: "517 Raja",
    res: "2024-12-06T00:00:00.000Z",
    terms: "15-33; 85-bf",
    consultant: "Ella Marie Serrano",
    manager: "Josephine Javier",
    list_price: "3311000",
    total_price: "2979900",
    status: "Closed",
    source: "Personal ADs",
    extension: "",
    closed: "2025-01-19T00:00:00.000Z",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    client: "Elaine Marie Pena",
    type: "Sale",
    project: "The Celandine",
    unit: "1519",
    res: "2024-12-07T00:00:00.000Z",
    terms: "30-58, 70-bf",
    consultant: "Jimmy Ala",
    manager: "Roberto Dalusung",
    list_price: "3400000",
    total_price: "3060000",
    status: "Back Out",
    source: "Personal ADs",
    extension: "",
    closed: "2025-01-19T00:00:00.000Z",
  },
];
