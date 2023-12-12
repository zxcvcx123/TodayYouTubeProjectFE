import {Bar} from "react-chartjs-2";
import React, {useState} from "react";
import { Chart as ChartJS } from "chart.js/auto"

export function BarChart({chartData}) {
  const options = {
    interaction: {
      mode: "index",
      intersect: false,
    }
  }

  return <Bar data={chartData} options={options} style={{width:'500px'}} />;
}