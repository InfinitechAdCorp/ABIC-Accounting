"use client";

import React from "react";
import ReactEcharts from "echarts-for-react";

type Props = {
  title: string;
  data: {
    name?: string;
    month?: string;
    count?: number;
  }[];
};

const Barchart = ({ title, data }: Props) => {
  const [x, y] = Object.keys(data[0]);

  const option = {
    xAxis: {
      type: "category",
      data: x,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: y,
        type: "bar",
      },
    ],
  };

  return (
    <>
      <h1 className="font-semibold text-lg">{title}</h1>
      <ReactEcharts option={option} />
    </>
  );
};

export default Barchart;
