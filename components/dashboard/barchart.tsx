"use client";

import React from "react";
import ReactEcharts from "echarts-for-react";
import { ChartDatum } from "@/components/globals/types";

type Props = {
  title: string;
  data: ChartDatum[];
};

const Barchart = ({ title, data }: Props) => {
  let x: string[] = [];
  let y: number[] = [];

  if (data) {
    x = data.map((datum) => {
      return datum.x;
    });
    y = data.map((datum) => {
      return datum.y;
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
    tooltip: {
      show: true,
    },
  };

  return <ReactEcharts option={option} />;
};

export default Barchart;
