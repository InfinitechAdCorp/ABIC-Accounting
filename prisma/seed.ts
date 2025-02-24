import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const accounts: Prisma.AccountCreateInput[] = [
  {
    name: "SCB 443",
    th_access: true,
    cm_access: false,
  },
  {
    name: "SCB 483",
    th_access: true,
    cm_access: false,
  },
  {
    name: "SCB 202",
    th_access: true,
    cm_access: true,
  },
];

const tClients: Prisma.TClientCreateInput[] = [
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[2].name },
        create: accounts[2],
      },
    },
    name: "Hu Yanchong",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[2].name },
        create: accounts[2],
      },
    },
    name: "Weiwei Chen",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[2].name },
        create: accounts[2],
      },
    },
    name: "Dan Li",
  },
];

const transactions: Prisma.TransactionCreateInput[] = [
  {
    t_client: {
      connectOrCreate: {
        where: { name: tClients[0].name },
        create: {
          name: tClients[0].name,
        },
      },
    },
    date: "2025-02-01T00:00:00.000Z",
    voucher: "00001",
    check: "24837",
    particulars: "Tivoli",
    type: "Credit",
    amount: 5000,
    status: "Active",
    proof: "no-image.jpg",
  },
  {
    t_client: {
      connectOrCreate: {
        where: { name: tClients[1].name },
        create: {
          name: tClients[1].name,
        },
      },
    },
    date: "2025-02-05T00:00:00.000Z",
    voucher: "00002",
    check: "76598",
    particulars: "Alea Residences",
    type: "Debit",
    amount: 3000,
    status: "Active",
    proof: "no-image.jpg",
  },
  {
    t_client: {
      connectOrCreate: {
        where: { name: tClients[2].name },
        create: {
          name: tClients[2].name,
        },
      },
    },
    date: "2025-02-10T00:00:00.000Z",
    voucher: "00003",
    check: "42783",
    particulars: "Jazz Residences",
    type: "Credit",
    amount: 4000,
    status: "Active",
    proof: "no-image.jpg",
  },
];

const cClients: Prisma.CClientCreateInput[] = [
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[2].name },
        create: accounts[2],
      },
    },
    name: "Jun Xie",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[2].name },
        create: accounts[2],
      },
    },
    name: "Quan Long",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[2].name },
        create: accounts[2],
      },
    },
    name: "Zong Guofeng",
  },
];

const collections: Prisma.CollectionCreateInput[] = [
  {
    c_client: {
      connectOrCreate: {
        where: { name: cClients[0].name },
        create: cClients[0],
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
    c_client: {
      connectOrCreate: {
        where: { name: cClients[1].name },
        create: cClients[1],
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
    c_client: {
      connectOrCreate: {
        where: { name: cClients[2].name },
        create: cClients[2],
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

const listings: Prisma.ListingCreateInput[] = [
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[2].name },
        create: accounts[2],
      },
    },
    client: "Mary Rose",
    type: "Sale",
    project: "Calathea Place",
    unit: "607 Marantina",
    res: "2024-12-01T00:00:00.000Z",
    terms: "50-50 bf",
    specialist: "Joyce Roa",
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
        where: { name: accounts[2].name },
        create: accounts[2],
      },
    },
    client: "Yeonseo Oh",
    type: "Sale",
    project: "Alea",
    unit: "517 Raja",
    res: "2024-12-06T00:00:00.000Z",
    terms: "15-33; 85-bf",
    specialist: "Ella Marie Serrano",
    manager: "Josephine Javier",
    list_price: "3311000",
    total_price: "2979900",
    status: "Closed",
    source: "Personal ADs",
    extension: undefined,
    closed: "2025-01-19T00:00:00.000Z",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[2].name },
        create: accounts[2],
      },
    },
    client: "Elaine Marie Pena",
    type: "Sale",
    project: "The Celandine",
    unit: "1519",
    res: "2024-12-07T00:00:00.000Z",
    terms: "30-58, 70-bf",
    specialist: "Jimmy Ala",
    manager: "Roberto Dalusung",
    list_price: "3400000",
    total_price: "3060000",
    status: "Back Out",
    source: "Personal ADs",
    extension: undefined,
    closed: undefined,
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
  for (const tClient of tClients) {
    await prisma.tClient.create({
      data: tClient,
    });
  }

  console.log("Seeding Transactions");
  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: transaction,
    });
  }

  console.log("Seeding Collection Clients");
  for (const cClient of cClients) {
    await prisma.cClient.create({
      data: cClient,
    });
  }

  console.log("Seeding Collections");
  for (const collection of collections) {
    await prisma.collection.create({
      data: collection,
    });
  }

  console.log("Seeding Listings");
  for (const listing of listings) {
    await prisma.listing.create({
      data: listing,
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
