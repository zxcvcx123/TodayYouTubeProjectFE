import {Doughnut} from "react-chartjs-2";
import React from "react";
import { Chart as ChartJS } from "chart.js/auto"


export function DoughnutChart({chartData}) {
  return <Doughnut data={chartData} />;
}