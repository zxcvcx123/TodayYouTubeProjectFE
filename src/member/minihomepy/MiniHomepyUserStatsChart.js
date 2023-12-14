import React from "react";
import { Line } from "react-chartjs-2";

const Utils = {
  // 예시 함수. 실제 사용에 맞게 수정 필요
  months: ({ count }) => Array.from({ length: count }, (_, i) => `${i + 1}월`),
  numbers: ({ count, min, max }) =>
    Array.from(
      { length: count },
      () => Math.floor(Math.random() * (max - min + 1)) + min,
    ),
  CHART_COLORS: {
    red: "rgb(255, 99, 132)",
  },
  transparentize: (color, opacity) => {
    // 색상 투명도 조절 함수 구현
  },
};

function MiniHomepyUserStatsChart() {
  // 실제 데이터 구조에 맞게 수정 필요
  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

  const data = {
    labels: Utils.months({ count: DATA_COUNT }),
    datasets: [
      {
        label: "Dataset 1",
        data: Utils.numbers(NUMBER_CFG),
        fill: false,
        borderColor: Utils.CHART_COLORS.red,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        position: "average",
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default MiniHomepyUserStatsChart;
