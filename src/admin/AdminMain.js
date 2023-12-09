import React, {useEffect, useState} from "react";
import {Sidenav} from "./Sidenav";
import {Box, Flex} from "@chakra-ui/react";
import {BarChart} from "./BarChart";
import axios from "axios";

function AdminMain() {
  const [boardData, setBoardData] = useState({
    labels: [1,2,3,4],
    datasets:[{
      label: "boardData",
      data: [20,10,30,50]
    }]
  });

  useEffect(() => {
    axios.get("/api/admin/board")
      .then(response => {
        setBoardData(response.data.boardList);
      });
  }, []);


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
