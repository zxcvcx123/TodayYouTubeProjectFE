import {Bar} from "react-chartjs-2";
import React, {useState} from "react";
import { Chart as ChartJS } from "chart.js/auto"

export function BarChart({chartData}) {
  return <Bar data={chartData} style={{width:'500px'}} />;
}