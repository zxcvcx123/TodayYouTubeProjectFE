import {Bar} from "react-chartjs-2";
import React from "react";

export function BarChart({chartData}) {
  return <Bar data={chartData}/>;
}