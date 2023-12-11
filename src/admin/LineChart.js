import {Line} from "react-chartjs-2";
import React, {useState} from "react";
import {Chart as ChartJS} from "chart.js/auto"

export function LineChart({chartData}) {
  const options = {
    interaction: {
      intersect: false,
    }
  }

  return <Line data={chartData} options={options} style={{width: '500px'}}/>;
}