import React, {useEffect, useState} from "react";
import {Sidenav} from "./Sidenav";
import {Box, Flex} from "@chakra-ui/react";
import {BarChart} from "./BarChart";
import axios from "axios";

function AdminMain() {
  const [boardData, setBoardData] = useState({
    labels: [],
    datasets:[{
      label: "",
      data: []
    }]
  });

  useEffect(() => {
    axios.get("/api/admin/board")
      .then(response => {
        const dataFromBoardList = response.data.boardList;

        setBoardData({
          labels: dataFromBoardList.map(data => data.name_eng),
          datasets:[{
            label: "카테고리 별 글 작성",
            data: dataFromBoardList.map(data => data.count_category_board)
          }]
        });
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
