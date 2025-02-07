import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const accounts: Prisma.AccountCreateInput[] = [
  {
    name: "SCB 443",
    transaction_history_access: true,
    income_expenses_access: false,
    collection_monitoring_access: true,
  },
  {
    name: "SCB 483",
    transaction_history_access: false,
    income_expenses_access: true,
    collection_monitoring_access: false,
  },
  {
    name: "SCB 202",
    transaction_history_access: true,
    income_expenses_access: false,
    collection_monitoring_access: false,
  },
];

const transactionClients: Prisma.TransactionClientCreateInput[] = [
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    name: "Hu Yanchong",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    name: "Weiwei Chen",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    name: "Dan Li",
  },
];

const transactions: Prisma.TransactionCreateInput[] = [
  {
    transaction_client: {
      connectOrCreate: {
        where: { name: transactionClients[0].name },
        create: {
          name: transactionClients[0].name,
        },
      },
    },
    date: "2025-02-25T00:00:00.000Z",
    voucher: "00001",
    check: "24837",
    particulars: "Tivoli",
    type: "Credit",
    amount: 5000.5,
    status: "Active",
    proof: "no-image.jpg",
  },
  {
    transaction_client: {
      connectOrCreate: {
        where: { name: transactionClients[1].name },
        create: {
          name: transactionClients[1].name,
        },
      },
    },
    date: "2025-03-25T00:00:00.000Z",
    voucher: "00002",
    check: "76598",
    particulars: "Alea Residences",
    type: "Debit",
    amount: 3000.75,
    status: "Active",
    proof: "no-image.jpg",
  },
  {
    transaction_client: {
      connectOrCreate: {
        where: { name: transactionClients[2].name },
        create: {
          name: transactionClients[2].name,
        },
      },
    },
    date: "2025-04-20T00:00:00.000Z",
    voucher: "00003",
    check: "42783",
    particulars: "Jazz Residences",
    type: "Credit",
    amount: 4000.5,
    status: "Active",
    proof: "no-image.jpg",
  },
];

const collectionClients: Prisma.CollectionClientCreateInput[] = [
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    name: "Jun Xie",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    name: "Quan Long",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    name: "Zong Guofeng",
  },
];

const collections: Prisma.CollectionCreateInput[] = [
  {
    collection_client: {
      connectOrCreate: {
        where: { name: collectionClients[0].name },
        create: collectionClients[0],
      },
    },
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
  },
  {
    collection_client: {
      connectOrCreate: {
        where: { name: collectionClients[1].name },
        create: collectionClients[1],
      },
    },
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
  },
  {
    collection_client: {
      connectOrCreate: {
        where: { name: collectionClients[2].name },
        create: collectionClients[2],
      },
    },
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
  },
];

async function seeder() {
  console.log("\nStarted Seeding\n");

  console.log("Seeding Accounts");
  for (const account of accounts) {
    await prisma.account.create({
      data: account,
    });
  }

  console.log("Seeding Transaction Clients");
  for (const transactionClient of transactionClients) {
    await prisma.transactionClient.create({
      data: transactionClient,
    });
  }

  console.log("Seeding Transactions");
  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: transaction,
    });
  }

  console.log("Seeding Collection Clients");
  for (const collectionClient of collectionClients) {
    await prisma.collectionClient.create({
      data: collectionClient,
    });
  }

  console.log("Seeding Collections");
  for (const collection of collections) {
    await prisma.collection.create({
      data: collection,
    });
  }

  console.log("\nFinished Seeding");
}

seeder()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
