import { Bar } from "react-chartjs-2";
import React, { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";

export function BarChart({ chartData }) {
  if (!chartData || !chartData.labels || !chartData.datasets) {
    return null;
  }
  const options = {
    interaction: {
      mode: "index",
      intersect: false,
      width: "500px",
      height: "500px",
    },
  };

  return <Bar data={chartData} options={options} />;
}
