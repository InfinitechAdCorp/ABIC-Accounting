import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const accounts: Prisma.AccountCreateInput[] = [
  {
    name: "SCB 443",
    transaction_history_access: true,
    collection_monitoring_access: true,
  },
  {
    name: "SCB 483",
    transaction_history_access: true,
    collection_monitoring_access: false,
  },
  {
    name: "SCB 202",
    transaction_history_access: true,
    collection_monitoring_access: false,
  },
];

const transactionClients: Prisma.TransactionClientCreateInput[] = [
  {
    account: {
      connectOrCreate: {
        where: { name: "SCB 443" },
        create: {
          name: "SCB 443",
          transaction_history_access: true,
          collection_monitoring_access: true,
        },
      },
    },
    name: "Hu Yanchong",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: "SCB 443" },
        create: {
          name: "SCB 443",
          transaction_history_access: true,
          collection_monitoring_access: true,
        },
      },
    },
    name: "Weiwei Chen",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: "SCB 443" },
        create: {
          name: "SCB 443",
          transaction_history_access: true,
          collection_monitoring_access: true,
        },
      },
    },
    name: "Dan Li",
  },
];

const transactions: Prisma.TransactionCreateInput[] = [
  {
    transaction_client: {
      connectOrCreate: {
        where: { name: "Hu Yanchong" },
        create: {
          name: "Hu Yanchong",
        },
      },
    },
    date: "2025-02-25T00:00:00.000Z",
    voucher: "5245",
    check: "24837",
    particulars: "Tivoli",
    type: "Credit",
    amount: 5000.5,
  },
  {
    transaction_client: {
      connectOrCreate: {
        where: { name: "Weiwei Chen" },
        create: {
          name: "Weiwei Chen",
        },
      },
    },
    date: "2025-03-25T00:00:00.000Z",
    voucher: "4321",
    check: "76598",
    particulars: "Alea Residences",
    type: "Debit",
    amount: 3000.75,
  },
  {
    transaction_client: {
      connectOrCreate: {
        where: { name: "Dan Li" },
        create: {
          name: "Dan Li",
        },
      },
    },
    date: "2025-04-20T00:00:00.000Z",
    voucher: "4256",
    check: "42783",
    particulars: "Jazz Residences",
    type: "Credit",
    amount: 4000.5,
  },
];

const collectionClients: Prisma.CollectionClientCreateInput[] = [
  {
    account: {
      connectOrCreate: {
        where: { name: "SCB 443" },
        create: {
          name: "SCB 443",
          transaction_history_access: true,
          collection_monitoring_access: true,
        },
      },
    },
    name: "Jun Xie",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: "SCB 443" },
        create: {
          name: "SCB 443",
          transaction_history_access: true,
          collection_monitoring_access: true,
        },
      },
    },
    name: "Quan Long",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: "SCB 443" },
        create: {
          name: "SCB 443",
          transaction_history_access: true,
          collection_monitoring_access: true,
        },
      },
    },
    name: "Zong Guofeng",
  },
];

const collections: Prisma.CollectionCreateInput[] = [
  {
    account: {
      connectOrCreate: {
        where: { name: "SCB 443" },
        create: {
          name: "SCB 443",
          transaction_history_access: true,
          collection_monitoring_access: true,
        },
      },
    },
    collection_client: {
      connectOrCreate: {
        where: { name: "Jun Xie" },
        create: {
          name: "Jun Xie",
        },
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
    account: {
      connectOrCreate: {
        where: { name: "SCB 443" },
        create: {
          name: "SCB 443",
          transaction_history_access: true,
          collection_monitoring_access: true,
        },
      },
    },
    collection_client: {
      connectOrCreate: {
        where: { name: "Quan Long" },
        create: {
          name: "Quan Long",
        },
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
    account: {
      connectOrCreate: {
        where: { name: "SCB 443" },
        create: {
          name: "SCB 443",
          transaction_history_access: true,
          collection_monitoring_access: true,
        },
      },
    },
    collection_client: {
      connectOrCreate: {
        where: { name: "Zong Guofeng" },
        create: {
          name: "Zong Guofeng",
        },
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
  console.log("Started Seeding");

  accounts.forEach(async (account) => {
    await prisma.account.create({
      data: account,
    });
  });

  transactionClients.forEach(async (transactionClient) => {
    await prisma.transactionClient.create({
      data: transactionClient,
    });
  });

  // for (const transactionClient of transactionClients) {
  //   await prisma.transactionClient.create({
  //     data: transactionClient,
  //   });
  // }

  // transactions.forEach(async (transaction) => {
  //   await prisma.transaction.create({
  //     data: transaction,
  //   });
  // });

  // collectionClients.forEach(async (collectionClient) => {
  //   await prisma.collectionClient.create({
  //     data: collectionClient,
  //   });
  // });

  // collections.forEach(async (collection) => {
  //   await prisma.collection.create({
  //     data: collection,
  //   });
  // });

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
