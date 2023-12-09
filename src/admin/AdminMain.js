import React from "react";
import {Sidenav} from "./Sidenav";
import {Box, Flex} from "@chakra-ui/react";
import {BarChart} from "./BarChart";

function AdminMain() {
  return (
    <Flex>
      <Sidenav/>
      <Box>
        <BarChart chartData={}/>
      </Box>
    </Flex>
  );
}

export default AdminMain;
