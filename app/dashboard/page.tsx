import React from "react";
import { getCounts } from "@/components/dashboard/actions";
import Navbar from "@/components/globals/navbar";
import CountCard from "@/components/dashboard/countCard";
import { GrTransaction } from "react-icons/gr";
import { FaUsers, FaFileSignature } from "react-icons/fa6";

export type Counts = {
  transactionClients: number;
  transactions: number;
  collections: number;
};

const Dashboard = async () => {
  const { counts } = await getCounts();

  return (
    <>
      <Navbar />

      <div className="m-5 md:mx-7 xl:mx-14 2xl:mx-60">
        <div className="text-center">
          <h1 className="font-bold text-2xl mb-5">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 px-5 lg:px-24 xl:px-60 gap-3 mb-3">
          <CountCard
            model="Clients"
            link="/transaction-history/transaction-clients"
            count={counts.transactionClients}
          >
            <FaUsers size={56} />
          </CountCard>
          <CountCard
            model="Transactions"
            link="/transaction-history/transactions"
            count={counts.transactions}
          >
            <GrTransaction size={56} />
          </CountCard>
          <CountCard
            model="Collections"
            link="/collection-monitoring/collections"
            count={counts.collections}
          >
            <FaFileSignature size={56} />
          </CountCard>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
