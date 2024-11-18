import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

const Dashboard = () => {
  return (
    <>
      <Card className="my-5 mx-96 p-3">
        <CardHeader>
          <h1 className="font-bold text-xl">Dashboard</h1>
        </CardHeader>

        <CardBody>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <h1 className="font-bold text-lg">Transaction Monitoring</h1>
            <h1 className="font-bold text-lg">Contract Monitoring</h1>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <Card>
              <CardBody className="text-center">
                <h1 className="font-semibold text-base">Accounts</h1>
                <h1 className="font-bold text-2xl">0</h1>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="text-center">
                <h1 className="font-semibold text-base">Transactions</h1>
                <h1 className="font-bold text-2xl">0</h1>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="text-center">
                <h1 className="font-semibold text-base">Clients</h1>
                <h1 className="font-bold text-2xl">0</h1>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="text-center">
                <h1 className="font-semibold text-base">Contracts</h1>
                <h1 className="font-bold text-2xl">0</h1>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Dashboard;
