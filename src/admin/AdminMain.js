import React, { useEffect, useState } from "react";
import { Sidenav } from "./Sidenav";
import {
  Badge,
  Box,
  Card,
  CardHeader,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BarChart } from "./BarChart";
import axios from "axios";
import { DoughnutChart } from "./DoughnutChart";
import { LineChart } from "./LineChart";

// 도넛 차트 출력 형식
const DoughnutChartBox = ({ title, chartData }) => (
  <Box width={"150px"} alignItems={"center"}>
    <Text textAlign={"center"}>{title}</Text>
    <DoughnutChart chartData={chartData} />
  </Box>
);

/* title = 제목, data = map형태로 받아온 상태 값, countField = 상태값을 구분하는 이름*/
function CreateRankingCard({ title, data, countField }) {
  return (
    <>
      <Card w={"250px"} p={"10px"} alignItems={"center"}>
        <CardHeader>
          <Heading size="sm">{title}</Heading>
        </CardHeader>

        {data.slice(0, 5).map((item) => (
          <Box key={item.member_id}>
            <VStack>
              <Flex w={"200px"} mb={1}>
                <Badge
                  fontSize="xs"
                  mr={2}
                  variant={"outline"}
                  colorScheme={
                    item[`${countField}_rank`] === 1
                      ? "yellow"
                      : item[`${countField}_rank`] === 2
                        ? "blue"
                        : item[`${countField}_rank`] === 3
                          ? "orange"
                          : "white" // 기본 색상
                  }
                >
                  {item[`${countField}_rank`]}위
                </Badge>
                <Box minW={"100px"}>
                  <Heading size="xs">{item.member_id}</Heading>
                </Box>
                <Text fontSize="xs">{item[`${countField}_count`]}개</Text>
              </Flex>
            </VStack>
          </Box>
        ))}
      </Card>
    </>
  );
}

function AdminMain() {
  /* 로딩 상태 */
  const [isLoading, setIsLoading] = useState(true);
  /* 카테고리 별 게시글 수 */
  const [countCategoryBoard, setCountCategoryBoard] = useState(null);
  /* 카테고리 별 게시글 성비 수 (바) */
  const [countCategoryGender, setCountCategoryGender] = useState(null);
  /* 카테고리 별 조회수 합산 (라인) */
  const [countCategoryView, setCountCategoryView] = useState(null);
  /* 카테고리 별 게시글 성비 수 (도넛) */
  const [countCategoryGenderSports, setCountCategoryGenderSports] =
    useState(null);
  const [countCategoryGenderMukbang, setCountCategoryGenderMukbang] =
    useState(null);
  const [countCategoryGenderDaily, setCountCategoryGenderDaily] =
    useState(null);
  const [countCategoryGenderCooking, setCountCategoryGenderCooking] =
    useState(null);
  const [countCategoryGenderMovie, setCountCategoryGenderMovie] =
    useState(null);
  const [countCategoryGenderGame, setCountCategoryGenderGame] = useState(null);
  /* 유저 순위 (게시글, 좋아요, 댓글) */
  const [userWriteRankDataList, setUserWriteRankDataList] = useState(null);
  const [userLikeRankDataList, setUserLikeRankDataList] = useState(null);
  const [userCommentRankDataList, setUserCommentRankDataList] = useState(null);
  /* 카테고리 별 조회수 합산 (라인) */
  const [countVisitorMonthlyData, setCountVisitorMonthlyData] = useState(null);
  /* 전체, 오늘 방문자 수 */
  const [countVisitorAll, setCountVisitorAll] = useState(null);
  const [countVisitorToday, setCountVisitorToday] = useState(null);

  /* ---------- 게시글, 좋아요, 댓글 작성 불러와 state 셋팅 ---------- */
  useEffect(() => {
    axios.get("/api/admin/user").then((response) => {
      setUserWriteRankDataList(response.data.userWriteRankDataList);
      setUserLikeRankDataList(response.data.userLikeRankDataList);
      setUserCommentRankDataList(response.data.userCommentRankDataList);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/admin/board").then((response) => {
      const dataFromBoardList = response.data.boardDataList;

      // ------------------- 카테고리 별 게시글 수 (바) -------------------
      setCountCategoryBoard({
        labels: dataFromBoardList.map((data) => data.name_eng),
        datasets: [
          {
            label: "카테고리 별 게시글 수",
            data: dataFromBoardList.map((data) => data.count_category_board),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 3,
          },
        ],
      });

      // -------------------- 카테고리 별 조회수 합산 (라인) -------------------
      setCountCategoryView({
        labels: dataFromBoardList.map((data) => data.name_eng),
        datasets: [
          {
            label: "카테고리 별 조회수",
            data: dataFromBoardList.map((data) => data.count_category_view),
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            tension: 0.3,
          },
        ],
      });

      // -------------------- 카테고리 별 게시글 성비 (바) -------------------
      setCountCategoryGender({
        labels: dataFromBoardList.map((data) => data.name_eng),
        datasets: [
          {
            label: "남성",
            data: dataFromBoardList.map(
              (data) => data.count_category_members_man,
            ),
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235)",
            borderWidth: 3,
          },
          {
            label: "여성",
            data: dataFromBoardList.map(
              (data) => data.count_category_members_woman,
            ),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132)",
            borderWidth: 3,
          },
        ],
      });

      // -------------------- 카테고리 별 성비 (도넛) -------------------
      // 각각의 카테고리에 대한 데이터 필터링
      const filterDataByCategory = (category) => {
        return dataFromBoardList.filter((data) => data.name_eng === category);
      };

      // 각각의 도넛 차트 데이터 설정
      const generateDoughnutChartData = (category) => {
        const categoryData = filterDataByCategory(category);
        return {
          labels: ["남성", "여성"],
          datasets: [
            {
              label: categoryData.map((data) => data.name_eng),
              data: [
                categoryData.map((data) => data.count_category_members_man),
                categoryData.map((data) => data.count_category_members_woman),
              ],
              backgroundColor: [
                "rgba(54, 162, 235, 0.8)",
                "rgba(255, 99, 132, 0.8)",
              ],
              hoverOffset: 4,
            },
          ],
        };
      };

      // 각각의 상태에 데이터 설정
      setCountCategoryGenderGame(generateDoughnutChartData("game"));
      setCountCategoryGenderSports(generateDoughnutChartData("sports"));
      setCountCategoryGenderMovie(generateDoughnutChartData("movie"));
      setCountCategoryGenderMukbang(generateDoughnutChartData("mukbang"));
      setCountCategoryGenderDaily(generateDoughnutChartData("daily"));
      setCountCategoryGenderCooking(generateDoughnutChartData("cooking"));
    });
  }, []);

  // 방문자 데이터 불러와 state 세팅 및 라인차트 세팅
  useEffect(() => {
    // 방문자 통계 데이터 가져오기
    // visitorCountAll, visitorCountToday, visitorCountMonthlyLastYear
    axios.get("/api/getVisitorCount").then((response) => {
      const visitorData = response.data.visitorCountMonthlyLastYear;
      setCountVisitorAll(response.data.visitorCountAll);
      setCountVisitorToday(response.data.visitorCountToday);

      // -------------------- 월별 방문자 수 (라인) -------------------
      setCountVisitorMonthlyData({
        labels: visitorData.map((data) => data.year_month),
        datasets: [
          {
            label: "월별 방문자 수",
            data: visitorData.map((data) => data.visitor_count),
            fill: true,
            backgroundColor: "rgba(147,152,72,0.2)",
            borderColor: "rgb(147,152,72)",
            tension: 0,
          },
        ],
      });
    });
  }, []);

  if (countCategoryBoard == null) {
    return <Spinner />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Flex border={"1px solid blue"}>
      {/* ---------- 사이드 바 ----------*/}
      <Sidenav />
      {/* ---------- 메인 ----------*/}
      <Box>
        <Card p={1} w={"200px"}>
          <Flex>
            <Text mb={1} fontWeight={"bold"}>
              전체 방문자 수
              <Badge mx={1} fontSize="13px" colorScheme="green">
                {countVisitorAll}
              </Badge>
              명
            </Text>
          </Flex>
          <Flex>
            <Text fontWeight={"bold"}>
              오늘 방문자 수
              <Badge mx={1} fontSize="13px" colorScheme="blue">
                {countVisitorToday}
              </Badge>
              명
            </Text>
          </Flex>
        </Card>
        <Flex>
          <Box>
            <BarChart chartData={countCategoryBoard} />
            <BarChart chartData={countCategoryGender} />
          </Box>
          <Box w={"500px"}>
            <LineChart chartData={countCategoryView} />
            <LineChart chartData={countVisitorMonthlyData} />
          </Box>
          <Box bg={"whitesmoke"} h={"100%"} borderRadius={"30px"} p={"10px"}>
            <Flex mb={"10px"}>
              <DoughnutChartBox
                title="스포츠"
                chartData={countCategoryGenderSports}
              />
              <DoughnutChartBox
                title="먹방"
                chartData={countCategoryGenderMukbang}
              />
              <DoughnutChartBox
                title="일상"
                chartData={countCategoryGenderDaily}
              />
            </Flex>
            <Flex>
              <DoughnutChartBox
                title="요리"
                chartData={countCategoryGenderCooking}
              />
              <DoughnutChartBox
                title="영화/드라마"
                chartData={countCategoryGenderMovie}
              />
              <DoughnutChartBox
                title="게임"
                chartData={countCategoryGenderGame}
              />
            </Flex>
          </Box>
        </Flex>
        <Flex gap={2}>
          {/* ---------- 게시글 작성 순위 ---------- */}
          <CreateRankingCard
            title={"게시글 작성 순위"}
            data={userWriteRankDataList}
            countField={"write"}
          />

          {/* ---------- 좋아요 작성 순위 ---------- */}
          <CreateRankingCard
            title={"좋아요 작성 순위"}
            data={userLikeRankDataList}
            countField={"like"}
          />

          {/* ---------- 댓글 작성 순위 ---------- */}
          <CreateRankingCard
            title={"댓글 작성 순위"}
            data={userCommentRankDataList}
            countField={"comment"}
          />
        </Flex>
      </Box>
    </Flex>
  );
}

export default AdminMain;
