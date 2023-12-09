import React from "react";
import {Sidenav} from "./Sidenav";
import {Box, Flex} from "@chakra-ui/react";
import {BarChart} from "./BarChart";

function AdminMain() {
  return (
    <Flex>
      {/* ---------- 사이드 바 ----------*/}
      <Sidenav/>
      {/* ---------- 메인 ----------*/}
      <Box>
        <BarChart chartData={}/>
      </Box>
    </Flex>
  );
}

export default AdminMain;
