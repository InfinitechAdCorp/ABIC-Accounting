"use client";

import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { getCounts, getCharts } from "@/components/dashboard/actions";
import Barchart from "@/components/dashboard/barchart";
import { GrTransaction } from "react-icons/gr";
import { FaUsers, FaFileSignature } from "react-icons/fa6";
import Navbar from "@/components/globals/navbar";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export type Counts = {
  clients: number,
  transactions: number,
  collections: number,
};

export type Charts = {
  clientsWithTransactions: {
    name: string;
    count: number;
  }[];
  clientsWithCollections: {
    name: string;
    count: number;
  }[];
  monthlyTransactions: {
    month: string;
    count: number;
  }[];
  monthlyCollections: {
    month: string;
    count: number;
  }[];
};

const Dashboard = () => {
  const router = useRouter();
  const [counts, setCounts] = useState<Counts>({
    clients: 0,
    transactions: 0,
    collections: 0,
  });

  const [charts, setCharts] = useState<Charts>({
    clientsWithTransactions: [],
    clientsWithCollections: [],
    monthlyTransactions: [],
    monthlyCollections: [],
  });

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

        <div className="grid grid-cols-1 md:grid-cols-3 px-5 lg:px-24 xl:px-60 gap-3 mb-3">
          <Card
            className="cursor-pointer"
            title="View Clients"
            isPressable
            isHoverable
            onPress={() => {
              router.push("/transaction-clients");
            }}
          >
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

          <Card
            className="cursor-pointer"
            title="View Transactions"
            isPressable
            isHoverable
            onPress={() => router.push("/transactions")}
          >
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

          <Card
            className="cursor-pointer"
            title="View Collections"
            isPressable
            isHoverable
            onPress={() => router.push("/collections")}
          >
            <CardBody className="grid grid-cols-1 lg:grid-cols-2 px-10 py-7 gap-3">
              <div className="flex justify-center items-center">
                <FaFileSignature size={56} />
              </div>

              <div className="flex flex-col justify-center items-center">
                <h1 className="font-extrabold text-3xl">
                  {counts.collections}
                </h1>
                <h4 className="text-neutral-500">Collections</h4>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <Card className="mb-3 h-72">
            <CardBody className="text-center pt-7">
              <Barchart
                title="Transactions Per Client"
                data={charts.clientsWithTransactions}
              />
            </CardBody>
          </Card>

          <Card className="mb-3 h-72">
            <CardBody className="text-center pt-7">
              <Barchart
                title="Collections Per Client"
                data={charts.clientsWithCollections}
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
                title="Collections Per Month"
                data={charts.monthlyCollections}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
