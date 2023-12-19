import React, { useContext, useEffect, useState } from "react";
import { Sidenav } from "./Sidenav";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BarChart } from "../component/BarChart";
import axios from "axios";
import LoadingPage from "../component/LoadingPage";
import { DetectLoginContext } from "../component/LoginProvider";
import { useNavigate } from "react-router-dom";
import { DoughnutChart } from "../component/DoughnutChart";
import { LineChart } from "../component/LineChart";

// 도넛 차트 출력 형식
const DoughnutChartBox = ({ title, chartData }) => (
  <Box
    display={"flex"}
    flexDirection={"column"}
    alignItems={"center"}
    mx={"15px"}
    w={"150px"}
  >
    <Badge fontSize={"18px"} colorScheme={"blue"}>
      {title}
    </Badge>
    <DoughnutChart chartData={chartData} />
  </Box>
);

/* title = 제목, data = map형태로 받아온 상태 값, countField = 상태값을 구분하는 이름*/
function CreateRankingCard({ title, data, countField }) {
  return (
    <>
      <Card
        w={"250px"}
        p={"10px"}
        alignItems={"center"}
        boxShadow={"0 2px 10px rgba(0, 0, 0, 0.3)"}
      >
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
  const navigate = useNavigate();

  // 로그인 유저 정보
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

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
    return <LoadingPage />;
  }

  // 운영자만 문의게시판으로(/admin으로 검색해서 들어올때)
  if (!token.detectLogin || loginInfo.role_name !== "운영자") {
    return (
      <Box w={"80%"} m={"auto"}>
        <Alert
          // colorScheme="red"
          status="warning"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            관리자페이지 입니다!
          </AlertTitle>
          <Button mt={5} onClick={() => navigate("/")}>
            메인페이지로 가기
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <Flex>
      {/* ---------- 사이드 바 ----------*/}
      <Sidenav />
      {/* ---------- 메인 ----------*/}
      <Box p={"20px"}>
        <Flex>
          <Box
            m={"5px"}
            bg={"white"}
            boxShadow={"0 2px 10px rgba(0, 0, 0, 0.3)"}
            w={"500px"}
          >
            <Badge fontSize={"18px"} colorScheme={"blue"}>
              아아아
            </Badge>
            <BarChart chartData={countCategoryBoard} />
            <BarChart chartData={countCategoryGender} />
          </Box>
          <Box
            m={"5px"}
            bg={"white"}
            boxShadow={"0 2px 10px rgba(0, 0, 0, 0.3)"}
            w={"500px"}
          >
            <Badge fontSize={"18px"} colorScheme={"blue"}>
              아아아
            </Badge>
            <LineChart chartData={countCategoryView} />
            <LineChart chartData={countVisitorMonthlyData} />
          </Box>
          <Flex m={"5px"} gap={2} flexDirection={"column"}>
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
        </Flex>
        <Box
          bg={"white"}
          w={"1270px"}
          p={"10px"}
          m={"5px"}
          display="flex"
          flexDirection="column"
          justifyContent="center" // 세로 가운데 정렬
          alignItems="center" // 가로 가운데 정렬
          boxShadow={"0 2px 10px rgba(0, 0, 0, 0.3)"}
        >
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
      </Box>
    </Flex>
  );
}

export default AdminMain;
