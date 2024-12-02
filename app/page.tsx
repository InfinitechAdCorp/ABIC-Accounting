import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { getCounts, getCharts } from "@/components/dashboard/actions";
import Barchart from "@/components/dashboard/barchart";
import { FaUsers } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { FaFileSignature } from "react-icons/fa6";

const Dashboard = async () => {
  const { counts } = await getCounts();
  const { charts } = await getCharts();

  return (
    <>
      <div className="m-3 p-3">
        <h1 className="font-bold text-xl mb-5">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Card>
                <CardBody className="grid grid-cols-1 md:grid-cols-2 px-10 py-7">
                  <div className="flex justify-center items-center">
                    <FaUsers size={56} />
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <h1 className="font-extrabold text-2xl">
                      {counts.accounts}
                    </h1>
                    <h4 className="text-neutral-500">Accounts</h4>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="grid grid-cols-1 md:grid-cols-2 px-10 py-7">
                  <div className="flex justify-center items-center">
                    <GrTransaction size={56} />
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <h1 className="font-extrabold text-2xl">
                      {counts.transactions}
                    </h1>
                    <h4 className="text-neutral-500">Transactions</h4>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Card>
                <CardBody className="grid grid-cols-1 md:grid-cols-2 px-10 py-7">
                  <div className="flex justify-center items-center">
                    <FaUsers size={56} />
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <h1 className="font-extrabold text-2xl">
                      {counts.clients}
                    </h1>
                    <h4 className="text-neutral-500">Clients</h4>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="grid grid-cols-1 md:grid-cols-2 px-10 py-7">
                  <div className="flex justify-center items-center">
                    <FaFileSignature size={56} />
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <h1 className="font-extrabold text-2xl">
                      {counts.contracts}
                    </h1>
                    <h4 className="text-neutral-500">Contracts</h4>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
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
      </div>
    </>
  );
};

export default Dashboard;
