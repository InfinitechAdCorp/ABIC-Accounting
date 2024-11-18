"use client";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  title: string;
  data: {
    name: string;
    transactions?: number;
    contracts?: number;
  }[];
};

const Barchart = ({ title, data }: Props) => {
  const [x, y] = Object.keys(data[0]);

  return (
    <>
      <h1 className="font-semibold text-lg">{title}</h1>
      <ResponsiveContainer>
        <BarChart data={data}>
          <Tooltip />
          <XAxis dataKey={x} />
          <YAxis dataKey={y} />
          <Bar dataKey={y} fill="#0284c7"></Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Barchart;
