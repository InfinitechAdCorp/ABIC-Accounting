import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const accounts: Prisma.AccountCreateInput[] = [
  { name: "Hu Yanchong", starting_balance: 5000000 },
  { name: "Weiwei Chen", starting_balance: 3000000 },
  { name: "Dan Li", starting_balance: 5000000 },
];

const transactions: Prisma.TransactionCreateInput[] = [
  {
    date: "2024-11-25T00:00:00.000Z",
    voucher: "5245",
    check: "24837",
    particulars: "Tivoli",
    type: "Credit",
    amount: 5000.5,
    account: {
      connectOrCreate: {
        where: { name: "Hu Yanchong" },
        create: {
          name: "Hu Yanchong",
          starting_balance: 5000000,
        },
      },
    },
  },
  {
    date: "2024-10-25T00:00:00.000Z",
    voucher: "4321",
    check: "76598",
    particulars: "Alea Residences",
    type: "Debit",
    amount: 3000.75,
    account: {
      connectOrCreate: {
        where: { name: "Weiwei Chen" },
        create: {
          name: "Weiwei Chen",
          starting_balance: 3000000,
        },
      },
    },
  },
  {
    date: "2024-09-20T00:00:00.000Z",
    voucher: "4256",
    check: "42783",
    particulars: "Jazz Residences",
    type: "Credit",
    amount: 4000.5,
    account: {
      connectOrCreate: {
        where: { name: "Dan Li" },
        create: {
          name: "Dan Li",
          starting_balance: 4500000,
        },
      },
    },
  },
];

const clients: Prisma.ClientCreateInput[] = [
  { name: "Jun Xie" },
  { name: "Quan Long" },
  { name: "Zong Guofeng" },
];

const contracts: Prisma.ContractCreateInput[] = [
  {
    property: "Alea Residences",
    location: "Bacoor",
    start: "2024-11-25T00:00:00.000Z",
    end: "2027-11-25T00:00:00.000Z",
    advance: 1,
    deposit: 1,
    tenant_price: 3000,
    owner_income: 3000,
    abic_income: 3000,
    due: "2025-01-25T00:00:00.000Z",
    client: {
      connectOrCreate: {
        where: { name: "Jun Xie" },
        create: {
          name: "Jun Xie",
        },
      },
    },
  },
  {
    property: "Tivoli Residences",
    location: "Makati",
    start: "2024-11-25T00:00:00.000Z",
    end: "2027-11-25T00:00:00.000Z",
    advance: 1,
    deposit: 1,
    tenant_price: 5000,
    owner_income: 5000,
    abic_income: 5000,
    due: "2025-01-25T00:00:00.000Z",
    client: {
      connectOrCreate: {
        where: { name: "Quan Long" },
        create: {
          name: "Quan Long",
        },
      },
    },
  },
  {
    property: "The Oriental Place",
    location: "Makati",
    start: "2024-11-25T00:00:00.000Z",
    end: "2027-11-25T00:00:00.000Z",
    advance: 1,
    deposit: 1,
    tenant_price: 7000,
    owner_income: 7000,
    abic_income: 7000,
    due: "2025-01-25T00:00:00.000Z",
    client: {
      connectOrCreate: {
        where: { name: "Zong Guofeng" },
        create: {
          name: "Zong Guofeng",
        },
      },
    },
  },
];

async function seeder() {
  console.log("Started Seeding");

  await prisma.account.createMany({
    data: accounts,
  });

  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: transaction,
    });
  }

  await prisma.client.createMany({
    data: clients,
  });

  for (const contract of contracts) {
    await prisma.contract.create({
      data: contract,
    });
  }

  console.log("Finished Seeding");
}

seeder()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
