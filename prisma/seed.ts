import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const accounts: Prisma.AccountCreateInput[] = [
  {
    name: "SCB 443",
    th_access: true,
    cm_access: true,
  },
  {
    name: "SCB 483",
    th_access: true,
    cm_access: false,
  },
  {
    name: "SCB 202",
    th_access: true,
    cm_access: false,
  },
];

const listings: Prisma.ListingCreateInput[] = [
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[1].name },
        create: accounts[1],
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
        where: { name: accounts[1].name },
        create: accounts[1],
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
    extension: null,
    closed: "2025-01-19T00:00:00.000Z",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[1].name },
        create: accounts[1],
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
    extension: null,
    closed: null,
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[1].name },
        create: accounts[1],
      },
    },
    client: "Stephani Joy Macalino",
    type: "Sale",
    project: "Infina Towers",
    unit: "1128 North",
    res: "2024-12-06T00:00:00.000Z",
    terms: "30-72; 70-bf",
    specialist: "Mary Ann Ibe",
    manager: "Erika Fe Francisco",
    list_price: "2596000",
    total_price: "2336400",
    status: "Closed",
    source: "Personal ADs",
    extension: null,
    closed: "2025-01-10T00:00:00.000Z",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[1].name },
        create: accounts[1],
      },
    },
    client: "George Bungcayao",
    type: "Sale",
    project: "Infina Towers",
    unit: "3818 North",
    res: "2024-12-06T00:00:00.000Z",
    terms: "5-1; -72; 0-bf",
    specialist: "Mary Ann Ibe",
    manager: "Aldrin Tapia",
    list_price: "3436000",
    total_price: "3092400",
    status: "Closed",
    source: "Personal ADs",
    extension: "2025-02-15T00:00:00.000Z",
    closed: "2025-02-01T00:00:00.000Z",
  },
];

const transactions: Prisma.TransactionCreateInput[] = [
  // 443
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    t_client: {
      connectOrCreate: {
        where: { name: "Zhou Chen" },
        create: {
          name: "Zhou Chen",
        },
      },
    },
    date: "2025-01-06T00:00:00.000Z",
    voucher_number: null,
    check_number: "77968",
    particulars: "PMR Celeste 3131 - December 2024 Rental",
    type: "Credit",
    amount: 20000,
    status: "Active",
    proof: null,
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    t_client: {
      connectOrCreate: {
        where: { name: "Huan Xiong" },
        create: {
          name: "Huan Xiong",
        },
      },
    },
    date: "2025-01-06T00:00:00.000Z",
    voucher_number: null,
    check_number: "77970",
    particulars: "BXP Brent 1207 - December 2024 Rental",
    type: "Credit",
    amount: 26000,
    status: "Active",
    proof: null,
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    t_client: {
      connectOrCreate: {
        where: { name: "Jiang Huijin" },
        create: {
          name: "Jiang Huijin",
        },
      },
    },
    date: "2025-01-06T00:00:00.000Z",
    voucher_number: null,
    check_number: "77971",
    particulars: "Acqua Sutherland 2319 - December 2024 Rental",
    type: "Credit",
    amount: 22000,
    status: "Active",
    proof: null,
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    t_client: {
      connectOrCreate: {
        where: { name: "Dandan Li" },
        create: {
          name: "Dandan Li",
        },
      },
    },
    date: "2025-01-06T00:00:00.000Z",
    voucher_number: null,
    check_number: "77972",
    particulars: "Jaxx Residences TD 3203 - December 2024 Rental",
    type: "Credit",
    amount: 21000,
    status: "Active",
    proof: null,
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    t_client: {
      connectOrCreate: {
        where: { name: "Zhou Chen" },
        create: {
          name: "Zhou Chen",
        },
      },
    },
    date: "2025-01-06T00:00:00.000Z",
    voucher_number: null,
    check_number: "77973",
    particulars: "BXP W 1516 - December 2024 Rental",
    type: "Credit",
    amount: 24000,
    status: "Active",
    proof: null,
  },

  // 483
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[1].name },
        create: accounts[1],
      },
    },
    t_client: {
      connectOrCreate: {
        where: { name: "Abic Realty" },
        create: {
          name: "Abic Realty",
        },
      },
    },
    date: "2025-01-09T00:00:00.000Z",
    voucher_number: null,
    check_number: "LIND",
    particulars: "Toyota Hi-Ace Payment for the Month of January 2025",
    type: "Debit",
    amount: 9737.38,
    status: "Active",
    proof: null,
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[1].name },
        create: accounts[1],
      },
    },
    t_client: {
      connectOrCreate: {
        where: { name: "Abic Realty" },
        create: {
          name: "Abic Realty",
        },
      },
    },
    date: "2025-01-10T00:00:00.000Z",
    voucher_number: null,
    check_number: "73115",
    particulars:
      "KGR Icho 315 - Excess payment for Monthly Amortization - January 2025 (Jui Long Hsu) LAST",
    type: "Debit",
    amount: 209261.44,
    status: "Active",
    proof: null,
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[1].name },
        create: accounts[1],
      },
    },
    t_client: {
      connectOrCreate: {
        where: { name: "Xu Zhang" },
        create: {
          name: "Xu Zhang",
        },
      },
    },
    date: "2025-01-13T00:00:00.000Z",
    voucher_number: null,
    check_number: "78005",
    particulars: "Gramercy Res. 6603 - Mark up",
    type: "Credit",
    amount: 4000,
    status: "Active",
    proof: null,
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[1].name },
        create: accounts[1],
      },
    },
    t_client: {
      connectOrCreate: {
        where: { name: "Huan Xiong" },
        create: {
          name: "Huan Xiong",
        },
      },
    },
    date: "2025-01-13T00:00:00.000Z",
    voucher_number: null,
    check_number: "78008",
    particulars: "PMR Astra 2305 - Mark up",
    type: "Credit",
    amount: 1000,
    status: "Active",
    proof: null,
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[1].name },
        create: accounts[1],
      },
    },
    t_client: {
      connectOrCreate: {
        where: { name: "Dandan Li" },
        create: {
          name: "Dandan Li",
        },
      },
    },
    date: "2025-01-13T00:00:00.000Z",
    voucher_number: null,
    check_number: "78010",
    particulars: "Tivoli Iris 3004 - Abic Comm.",
    type: "Credit",
    amount: 400000,
    status: "Active",
    proof: null,
  },

  // 202
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[2].name },
        create: accounts[2],
      },
    },
    t_client: {
      connectOrCreate: {
        where: { name: "Zhou Chen" },
        create: {
          name: "Zhou Chen",
        },
      },
    },
    date: "2025-01-06T00:00:00.000Z",
    voucher_number: null,
    check_number: "77968",
    particulars: "PMR Celeste 3131 - December 2024 Rental",
    type: "Debit",
    amount: 20000,
    status: "Active",
    proof: null,
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[2].name },
        create: accounts[2],
      },
    },
    t_client: {
      connectOrCreate: {
        where: { name: "Huan Xiong" },
        create: {
          name: "Huan Xiong",
        },
      },
    },
    date: "2025-01-06T00:00:00.000Z",
    voucher_number: null,
    check_number: "77970",
    particulars: "BXP Brent 1207 - December 2024 Rental",
    type: "Debit",
    amount: 26000,
    status: "Active",
    proof: null,
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[2].name },
        create: accounts[2],
      },
    },
    t_client: {
      connectOrCreate: {
        where: { name: "Jiang Huijin" },
        create: {
          name: "Jiang Huijin",
        },
      },
    },
    date: "2025-01-06T00:00:00.000Z",
    voucher_number: null,
    check_number: "77971",
    particulars: "Acqua Sutherland 2319 - December 2024 Rental",
    type: "Debit",
    amount: 22000,
    status: "Active",
    proof: null,
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[2].name },
        create: accounts[2],
      },
    },
    t_client: {
      connectOrCreate: {
        where: { name: "Dandan Li" },
        create: {
          name: "Dandan Li",
        },
      },
    },
    date: "2025-01-06T00:00:00.000Z",
    voucher_number: null,
    check_number: "77972",
    particulars: "Jazz Residences TD 3203 - December 2024 Rental",
    type: "Debit",
    amount: 21000,
    status: "Active",
    proof: null,
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[2].name },
        create: accounts[2],
      },
    },
    t_client: {
      connectOrCreate: {
        where: { name: "Zhao Xixian" },
        create: {
          name: "Zhao Xixian",
        },
      },
    },
    date: "2025-01-06T00:00:00.000Z",
    voucher_number: null,
    check_number: "77974",
    particulars: "ADB 6K - December 2024 Rental",
    type: "Debit",
    amount: 17000,
    status: "Active",
    proof: null,
  },
];

const collections: Prisma.CollectionCreateInput[] = [
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    c_client: {
      connectOrCreate: {
        where: { name: "Hu Yanchong" },
        create: { name: "Hu Yanchong" },
      },
    },
    property: "Lerato Unit 2506",
    location: "Makati",
    start: "2024-03-05T00:00:00.000Z",
    end: "2027-03-05T00:00:00.000Z",
    advance: 1,
    deposit: 1,
    tenant_price: 25000,
    owner_income: null,
    abic_income: null,
    due: "2024-12-05T00:00:00.000Z",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    c_client: {
      connectOrCreate: {
        where: { name: "Dandan Li" },
        create: { name: "Dandan Li" },
      },
    },
    property: "Jazz Residences Unit 5202 Tower D",
    location: "Makati",
    start: "2023-05-15T00:00:00.000Z",
    end: "2027-05-15T00:00:00.000Z",
    advance: 1,
    deposit: 1,
    tenant_price: 20000,
    owner_income: null,
    abic_income: null,
    due: "2024-11-15T00:00:00.000Z",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    c_client: {
      connectOrCreate: {
        where: { name: "Jun Xie" },
        create: { name: "Jun Xie" },
      },
    },
    property: "The Ellis 17H",
    location: "Makati",
    start: "2023-06-06T00:00:00.000Z",
    end: "2027-06-06T00:00:00.000Z",
    advance: 1,
    deposit: 1,
    tenant_price: 13000,
    owner_income: null,
    abic_income: null,
    due: "2024-11-06T00:00:00.000Z",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    c_client: {
      connectOrCreate: {
        where: { name: "Quan Long" },
        create: { name: "Quan Long" },
      },
    },
    property: "The Rise 46F East Wing",
    location: "Makati",
    start: "2023-08-15T00:00:00.000Z",
    end: "2027-08-15T00:00:00.000Z",
    advance: 1,
    deposit: 1,
    tenant_price: 16000,
    owner_income: null,
    abic_income: null,
    due: "2024-10-15T00:00:00.000Z",
  },
  {
    account: {
      connectOrCreate: {
        where: { name: accounts[0].name },
        create: accounts[0],
      },
    },
    c_client: {
      connectOrCreate: {
        where: { name: "Chanxiang Huang" },
        create: { name: "Chanxiang Huang" },
      },
    },
    property: "Knightsbridge Res. Unit 5113",
    location: "Makati",
    start: "2023-10-03T00:00:00.000Z",
    end: "2027-10-03T00:00:00.000Z",
    advance: 1,
    deposit: 1,
    tenant_price: 16000,
    owner_income: null,
    abic_income: null,
    due: "2024-11-03T00:00:00.000Z",
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

  console.log("Seeding Transactions");
  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: transaction,
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
