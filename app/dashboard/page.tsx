import React from "react";
import { get as getAccount } from "@/components/accounts/actions";
import { getCounts } from "@/components/dashboard/actions";
import Navbar from "@/components/globals/navbar";
import CountCard from "@/components/dashboard/countCard";
import { GrTransaction } from "react-icons/gr";
import { FaUsers, FaFileSignature } from "react-icons/fa6";
import { retry } from "@/components/globals/serverUtils";

export type Counts = {
  tClients: number;
  transactions: number;
  collections: number;
};

const Dashboard = async () => {
  const { record: account } = await retry(getAccount);
  const { counts } = await getCounts();

  return (
    <>
      <Navbar record={account!} />

      <div className="m-5 md:mx-7 xl:mx-14 2xl:mx-60">
        <div className="text-center">
          <h1 className="font-bold text-2xl mb-5">DASHBOARD</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 px-5 lg:px-24 xl:px-60 gap-3 mb-3">
          {account.th_access && (
            <>
              <CountCard
                icon={<FaUsers size={56} />}
                model="Clients"
                url="/transaction-history/clients"
                count={counts.tClients}
              ></CountCard>
              <CountCard
                icon={<GrTransaction size={56} />}
                model="Transactions"
                url="/transaction-history/transactions"
                count={counts.transactions}
              ></CountCard>
            </>
          )}

          {account.cm_access && (
            <CountCard
              icon={<FaFileSignature size={56} />}
              model="Collections"
              url="/collection-monitoring/collections"
              count={counts.collections}
            ></CountCard>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
