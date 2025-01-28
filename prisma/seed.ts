import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const transactionClients: Prisma.TransactionClientCreateInput[] = [
  { name: "Hu Yanchong" },
  { name: "Weiwei Chen" },
  { name: "Dan Li" },
];

const transactions: Prisma.TransactionCreateInput[] = [
  {
    date: "2025-02-25T00:00:00.000Z",
    voucher: "5245",
    check: "24837",
    particulars: "Tivoli",
    type: "Credit",
    amount: 5000.5,
    transaction_client: {
      connectOrCreate: {
        where: { name: "Hu Yanchong" },
        create: {
          name: "Hu Yanchong",
        },
      },
    },
  },
  {
    date: "2025-03-25T00:00:00.000Z",
    voucher: "4321",
    check: "76598",
    particulars: "Alea Residences",
    type: "Debit",
    amount: 3000.75,
    transaction_client: {
      connectOrCreate: {
        where: { name: "Weiwei Chen" },
        create: {
          name: "Weiwei Chen",
        },
      },
    },
  },
  {
    date: "2025-04-20T00:00:00.000Z",
    voucher: "4256",
    check: "42783",
    particulars: "Jazz Residences",
    type: "Credit",
    amount: 4000.5,
    transaction_client: {
      connectOrCreate: {
        where: { name: "Dan Li" },
        create: {
          name: "Dan Li",
        },
      },
    },
  },
];

const collectionClients: Prisma.CollectionClientCreateInput[] = [
  { name: "Jun Xie" },
  { name: "Quan Long" },
  { name: "Zong Guofeng" },
];

const collections: Prisma.CollectionCreateInput[] = [
  {
    property: "Alea Residences",
    location: "Bacoor",
    start: "2025-03-25T00:00:00.000Z",
    end: "2027-03-25T00:00:00.000Z",
    advance: 1,
    deposit: 1,
    tenant_price: 3000,
    owner_income: 3000,
    abic_income: 3000,
    due: "2025-05-25T00:00:00.000Z",
    collection_client: {
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
    start: "2025-02-25T00:00:00.000Z",
    end: "2027-02-25T00:00:00.000Z",
    advance: 1,
    deposit: 1,
    tenant_price: 5000,
    owner_income: 5000,
    abic_income: 5000,
    due: "2025-04-25T00:00:00.000Z",
    collection_client: {
      connectOrCreate: {
        where: { name: "Quan Long" },
        create: {
          name: "Quan Long",
        },
      },
    },
  },
  {
    property: "Oriental Place",
    location: "Makati",
    start: "2025-04-25T00:00:00.000Z",
    end: "2027-04-25T00:00:00.000Z",
    advance: 1,
    deposit: 1,
    tenant_price: 7000,
    owner_income: 7000,
    abic_income: 7000,
    due: "2025-06-25T00:00:00.000Z",
    collection_client: {
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

  await prisma.transactionClient.createMany({
    data: transactionClients,
  });

  transactions.forEach(async (transaction) => {
    await prisma.transaction.create({
      data: transaction,
    });
  });

  await prisma.collectionClient.createMany({
    data: collectionClients,
  });

  collections.forEach(async (collection) => {
    await prisma.collection.create({
      data: collection,
    });
  });

  console.log("Finished Seeding");
}

seeder()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
