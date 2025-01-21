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
  const x: string[] = [];
  const y: number[] = [];

  if (data) {
    data.forEach((datum) => {
      Object.entries(datum).forEach((entry) => {
        const [key, value] = entry;
        if (["name", "month"].includes(key)) {
          x.push(value as string);
        } else if (key == "count") {
          y.push(value as number);
        }
      });
    });
  }

  const option = {
    xAxis: {
      type: "category",
      data: x,
    },
    yAxis: {
      type: "value",
      splitNumber: 1,
    },
    series: [
      {
        data: y,
        type: "bar",
      },
    ],
    title: {
      text: title,
      left: "center",
    },
    textStyle: {
      fontFamily: "Montserrat",
    },
    color: ["#0072F5"],
  };

  return (
    <>
      <ReactEcharts option={option} />
    </>
  );
};

export default Barchart;
