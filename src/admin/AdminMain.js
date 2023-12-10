import React, {useEffect, useState} from "react";
import {Sidenav} from "./Sidenav";
import {Box, Flex, SimpleGrid, Spinner} from "@chakra-ui/react";
import {BarChart} from "./BarChart";
import axios from "axios";
import * as PropTypes from "prop-types";
import {DoughnutChart} from "./DoughnutChart";

DoughnutChart.propTypes = {chartData: PropTypes.any};

function AdminMain() {
  const [countCategoryBoard, setCountCategoryBoard] = useState(null);
  const [countCategoryGender, setCountCategoryGender] = useState(null);
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

        // 카테고리 별 게시글 수 바차트
        setCountCategoryBoard({
          labels: dataFromBoardList.map(data => data.name_eng),
          datasets: [{
            label: "카테고리 별 게시글 수",
            data: dataFromBoardList.map(data => data.count_category_board)
          }]
        });

        // 카테고리 별 성비 바차트
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

        // 카테고리 별 성비 도넛차트
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
          </Box>
          <Box>
            <Flex columns={3} width={"200px"}>
              <DoughnutChart chartData={countCategoryGenderSports}/>
              <DoughnutChart chartData={countCategoryGenderMukbang}/>
              <DoughnutChart chartData={countCategoryGenderDaily}/>
            </Flex>
            <Flex columns={3} width={"200px"}>
              <DoughnutChart chartData={countCategoryGenderCooking}/>
              <DoughnutChart chartData={countCategoryGenderMovie}/>
              <DoughnutChart chartData={countCategoryGenderGame}/>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default AdminMain;
