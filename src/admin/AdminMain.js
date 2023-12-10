import React, {useEffect, useState} from "react";
import {Sidenav} from "./Sidenav";
import {Box, Flex, Spinner} from "@chakra-ui/react";
import {BarChart} from "./BarChart";
import axios from "axios";

function AdminMain() {
  const [countCategoryBoard, setCountCategoryBoard] = useState(null);
  const [countCategoryGender, setCountCategoryGender] = useState(null);

  useEffect(() => {
    axios.get("/api/admin/board")
      .then(response => {
        const dataFromBoardList = response.data.boardList;

        setCountCategoryBoard({
          labels: dataFromBoardList.map(data => data.name_eng),
          datasets: [{
            label: "카테고리 별 글 작성",
            data: dataFromBoardList.map(data => data.count_category_board)
          }]
        });

        setCountCategoryGender({
          labels: dataFromBoardList.map(data => data.name_eng),
          datasets: [{
            label: "남성",
            data: dataFromBoardList.map(data => data.count_category_members_man)
          }, {
            label: "여성",
            data: dataFromBoardList.map(data => data.count_category_members_woman)
          }]
        });
      });
  }, []);

  if (countCategoryBoard == null) {
    return <Spinner/>;
  }

  return (
    <Flex>
      {/* ---------- 사이드 바 ----------*/}
      <Sidenav/>
      {/* ---------- 메인 ----------*/}
      <Box>
        <BarChart chartData={countCategoryBoard}/>
        <BarChart chartData={countCategoryGender}/>
      </Box>
    </Flex>
  );
}

export default AdminMain;
