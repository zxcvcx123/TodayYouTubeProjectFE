import React, {useEffect, useState} from "react";
import {Sidenav} from "./Sidenav";
import {Box, Flex} from "@chakra-ui/react";
import {BarChart} from "./BarChart";
import axios from "axios";

function AdminMain() {
  const [boardData, setBoardData] = useState({
    labels: [1,2,3,4],
    datasets:[{
      label: "board",
      data: [20,10,30,50]
    }]
  });

  // useEffect(() => {
  //   axios.get("/api/admin/board")
  //     .then(response => console.log(response.data));
  // }, []);


  return (
    <Flex>
      {/* ---------- 사이드 바 ----------*/}
      <Sidenav/>
      {/* ---------- 메인 ----------*/}
      <Box>
        <BarChart chartData={boardData}/>
      </Box>
    </Flex>
  );
}

export default AdminMain;
