import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { getCounts, getCharts } from "@/components/dashboard/actions";
import Barchart from "@/components/dashboard/barchart";

const Dashboard = async () => {
  const { counts } = await getCounts();
  const { charts } = await getCharts();

  return (
    <>
      <div className="flex justify-center">
        <Card className="my-5 p-3">
          <CardHeader>
            <h1 className="font-bold text-xl">Dashboard</h1>
          </CardHeader>

          <CardBody>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <h1 className="font-bold text-lg">Transaction Monitoring</h1>
              <h1 className="font-bold text-lg">Contract Monitoring</h1>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-3">
              <Card>
                <CardBody className="text-center px-20 py-10">
                  <h1 className="font-semibold text-xl">Accounts</h1>
                  <h1 className="font-bold text-2xl">{counts.accounts}</h1>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="text-center px-20 py-10">
                  <h1 className="font-semibold text-xl">Transactions</h1>
                  <h1 className="font-bold text-2xl">{counts.transactions}</h1>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="text-center px-20 py-10">
                  <h1 className="font-semibold text-xl">Clients</h1>
                  <h1 className="font-bold text-2xl">{counts.clients}</h1>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="text-center px-20 py-10">
                  <h1 className="font-semibold text-xl">Contracts</h1>
                  <h1 className="font-bold text-2xl">{counts.contracts}</h1>
                </CardBody>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Card className="mb-3 h-72">
                <CardBody className="text-center">
                  <Barchart
                    title="Transactions Per Account"
                    data={charts.accountsWithTransactions}
                  />
                </CardBody>
              </Card>

              <Card className="mb-3 h-72">
                <CardBody className="text-center">
                  <Barchart
                    title="Contracts Per Client"
                    data={charts.clientsWithContracts}
                  />
                </CardBody>
              </Card>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
