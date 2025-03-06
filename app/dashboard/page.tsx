import React from "react";
import { get as getAccount } from "@/components/accounts/actions";
import { getCounts } from "@/components/dashboard/actions";
import Navbar from "@/components/globals/navbar";
import CountCard from "@/components/dashboard/countCard";
import { GrTransaction } from "react-icons/gr";
import { FaUsers, FaReceipt } from "react-icons/fa6";
import { retry } from "@/components/globals/serverUtils";
import { Card, CardBody } from "@heroui/react";

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
      <Navbar />

      <div className="max-h-[93vh]">
        <Card radius="none" className="py-[0.10rem] px-2">
          <CardBody>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Dashboard</h3>
            </div>
          </CardBody>
        </Card>

        <Card className="m-5 md:my-7 md:mx-96 py-3 px-3">
          <CardBody>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 px-5 mx-40 gap-3 mb-3`}
            >
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
            </div>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 px-5 mx-40 gap-3 mb-3`}
            >
              <CountCard
                icon={<FaReceipt size={56} />}
                model="ARs"
                url="/tools/acknowledgement-receipt"
                count={counts.ars}
              ></CountCard>
              <CountCard
                icon={<FaReceipt size={56} />}
                model="BSs"
                url="/tools/billing-statement"
                count={counts.bss}
              ></CountCard>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
