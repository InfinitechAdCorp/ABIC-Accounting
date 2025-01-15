"use client";

import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { getCounts, getCharts } from "@/components/dashboard/actions";
import Barchart from "@/components/dashboard/barchart";
import { GrTransaction } from "react-icons/gr";
import { FaUsers, FaFileSignature } from "react-icons/fa6";
import Navbar from "@/components/globals/navbar";

export const dynamic = "force-dynamic";

const Dashboard = () => {
  const [counts, setCounts] = useState([]);
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      const countsResponse = await getCounts();
      setCounts(countsResponse.counts);
    };

    const fetchCharts = async () => {
      const chartsResponse = await getCharts();
      setCharts(chartsResponse.charts);
    };

    fetchCounts();
    fetchCharts();
  }, []);

  return (
    <>
      <Navbar />

      <div className="m-5 md:mx-7 xl:mx-14 2xl:mx-60">
        <div className="text-center">
          <h1 className="font-bold text-2xl mb-5">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Card>
                <CardBody className="grid grid-cols-1 lg:grid-cols-2 px-10 py-7 gap-3">
                  <div className="flex justify-center items-center">
                    <FaUsers size={56} />
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <h1 className="font-extrabold text-3xl">
                      {counts.accounts}
                    </h1>
                    <h4 className="text-neutral-500">Accounts</h4>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="grid grid-cols-1 lg:grid-cols-2 px-10 py-7 gap-3">
                  <div className="flex justify-center items-center">
                    <GrTransaction size={56} />
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <h1 className="font-extrabold text-3xl">
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
                <CardBody className="grid grid-cols-1 lg:grid-cols-2 px-10 py-7 gap-3">
                  <div className="flex justify-center items-center">
                    <FaUsers size={56} />
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <h1 className="font-extrabold text-3xl">
                      {counts.clients}
                    </h1>
                    <h4 className="text-neutral-500">Clients</h4>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="grid grid-cols-1 lg:grid-cols-2 px-10 py-7 gap-3">
                  <div className="flex justify-center items-center">
                    <FaFileSignature size={56} />
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <h1 className="font-extrabold text-3xl">
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
            <CardBody className="text-center pt-7">
              <Barchart
                title="Transactions Per Account"
                data={charts.accountsWithTransactions}
              />
            </CardBody>
          </Card>

          <Card className="mb-3 h-72">
            <CardBody className="text-center pt-7">
              <Barchart
                title="Contracts Per Client"
                data={charts.clientsWithContracts}
              />
            </CardBody>
          </Card>

          <Card className="mb-3 h-72">
            <CardBody className="text-center pt-7">
              <Barchart
                title="Transactions Per Month"
                data={charts.monthlyTransactions}
              />
            </CardBody>
          </Card>

          <Card className="mb-3 h-72">
            <CardBody className="text-center pt-7">
              <Barchart
                title="Contracts Per Month"
                data={charts.monthlyContracts}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
