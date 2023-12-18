import { Doughnut } from "react-chartjs-2";
import React from "react";
import { Chart as ChartJS } from "chart.js/auto";

export function DoughnutChart({ chartData }) {
  if (!chartData || !chartData.labels || !chartData.datasets) {
    return null;
  }

  const options = {
    interaction: {
      mode: "index",
    },
    spacing: 0.5,
  };

  return <Doughnut data={chartData} options={options} />;
}
