import {Line} from "react-chartjs-2";
import React, {useState} from "react";
import {Chart as ChartJS} from "chart.js/auto"

export function LineChart({chartData}) {
  return <Line data={chartData} style={{width: '500px'}}/>;
}