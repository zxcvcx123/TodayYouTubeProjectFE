import React from "react";
import { Bar } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";
import MiniHomepyUserStatsChart from "./MiniHomepyUserStatsChart";

export function MiniHompeyAbout() {
  return (
    <>
      <Box>
        <h1>사용자 통계</h1>
        <MiniHomepyUserStatsChart />
      </Box>
    </>
  );
}
