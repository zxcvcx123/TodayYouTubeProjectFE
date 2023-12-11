import React, {useEffect, useState} from "react";
import {Sidenav} from "./Sidenav";
import {Box, Flex, Spinner, Text} from "@chakra-ui/react";
import {BarChart} from "./BarChart";
import axios from "axios";
import {DoughnutChart} from "./DoughnutChart";
import {LineChart} from "./LineChart";

function AdminMain() {
  /* 카테고리 별 게시글 수 */
  const [countCategoryBoard, setCountCategoryBoard] = useState(null);
  /* 카테고리 별 게시글 성비 수 (바) */
  const [countCategoryGender, setCountCategoryGender] = useState(null);
  /* 카테고리 별 조회수 합산 (라인) */
  const [countCategoryView, setCountCategoryView] = useState(null);
  /* 카테고리 별 게시글 성비 수 (도넛) */
  const [countCategoryGenderSports, setCountCategoryGenderSports] = useState(null);
  const [countCategoryGenderMukbang, setCountCategoryGenderMukbang] = useState(null);
  const [countCategoryGenderDaily, setCountCategoryGenderDaily] = useState(null);
  const [countCategoryGenderCooking, setCountCategoryGenderCooking] = useState(null);
  const [countCategoryGenderMovie, setCountCategoryGenderMovie] = useState(null);
  const [countCategoryGenderGame, setCountCategoryGenderGame] = useState(null);

  useEffect(() => {
    axios.get("/api/admin/board")
      .then(response => {
        const dataFromBoardList = response.data.boardList;

        // ------------------- 카테고리 별 게시글 수 (바) -------------------
        setCountCategoryBoard({
          labels: dataFromBoardList.map(data => data.name_eng),
          datasets: [{
            label: "카테고리 별 게시글 수",
            data: dataFromBoardList.map(data => data.count_category_board)
          }]
        });

        // -------------------- 카테고리 별 조회수 합산 (라인) -------------------
        setCountCategoryView({
          labels: dataFromBoardList.map(data => data.name_eng),
          datasets: [{
            label: "카테고리 별 게시글 수",
            data: dataFromBoardList.map(data => data.count_category_view)
          }]
        });

        // -------------------- 카테고리 별 게시글 성비 (바) -------------------
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

        // -------------------- 카테고리 별 성비 (도넛) -------------------
        // 각각의 카테고리에 대한 데이터 필터링
        const filterDataByCategory = (category) => {
          return dataFromBoardList.filter(data => data.name_eng === category);
        };

        // 각각의 도넛 차트 데이터 설정
        const generateDoughnutChartData = (category) => {
          const categoryData = filterDataByCategory(category);
          return {
            labels: ["남성", "여성"],
            datasets: [{
              label: categoryData.map(data => data.name_eng),
              data: [categoryData.map(data => data.count_category_members_man),
                categoryData.map(data => data.count_category_members_woman)],
              options: {
                cutoutPercentage: 65
              }
            }]
          };
        };

        // 각각의 상태에 데이터 설정
        setCountCategoryGenderGame(generateDoughnutChartData('game'));
        setCountCategoryGenderSports(generateDoughnutChartData('sports'));
        setCountCategoryGenderMovie(generateDoughnutChartData('movie'));
        setCountCategoryGenderMukbang(generateDoughnutChartData('mukbang'));
        setCountCategoryGenderDaily(generateDoughnutChartData('daily'));
        setCountCategoryGenderCooking(generateDoughnutChartData('cooking'));
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
        <Flex>

          <Box>
            <BarChart chartData={countCategoryBoard}/>
            <BarChart chartData={countCategoryGender}/>
            <LineChart chartData={countCategoryView}/>
          </Box>
          <Box bg={"whitesmoke"} h={"100%"} borderRadius={"30px"} p={"10px"}>
            <Flex mb={"10px"}>
              <Box width={"150px"} alignItems={"center"}>
                <Text textAlign={"center"}>스포츠</Text>
                <DoughnutChart chartData={countCategoryGenderSports}/>
              </Box>
              <Box width={"150px"} alignItems={"center"}>
                <Text textAlign={"center"}>먹방</Text>
                <DoughnutChart chartData={countCategoryGenderMukbang}/>
              </Box>
              <Box width={"150px"} alignItems={"center"}>
                <Text textAlign={"center"}>일상</Text>
                <DoughnutChart chartData={countCategoryGenderDaily}/>
              </Box>
            </Flex>
            <Flex>
              <Box width={"150px"} alignItems={"center"}>
                <Text textAlign={"center"}>요리</Text>
                <DoughnutChart chartData={countCategoryGenderCooking}/>
              </Box>
              <Box width={"150px"} alignItems={"center"}>
                <Text textAlign={"center"}>영화/드라마</Text>
                <DoughnutChart chartData={countCategoryGenderMovie}/>
              </Box>
              <Box width={"150px"} alignItems={"center"}>
                <Text textAlign={"center"}>게임</Text>
                <DoughnutChart chartData={countCategoryGenderGame}/>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default AdminMain;
