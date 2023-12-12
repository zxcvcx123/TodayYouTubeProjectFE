import React, {useEffect, useState} from "react";
import {Sidenav} from "./Sidenav";
import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Spinner,
  Stack,
  StackDivider,
  Text, VStack
} from "@chakra-ui/react";
import {BarChart} from "./BarChart";
import axios from "axios";
import {DoughnutChart} from "./DoughnutChart";
import {LineChart} from "./LineChart";

// 도넛 차트 출력 형식
const DoughnutChartBox = ({title, chartData}) => (
  <Box width={"150px"} alignItems={"center"}>
    <Text textAlign={"center"}>{title}</Text>
    <DoughnutChart chartData={chartData}/>
  </Box>
);

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
  const [countCategoryGenderSports, setCountCategoryGenderSports] = useState(null);
  const [countCategoryGenderMukbang, setCountCategoryGenderMukbang] = useState(null);
  const [countCategoryGenderDaily, setCountCategoryGenderDaily] = useState(null);
  const [countCategoryGenderCooking, setCountCategoryGenderCooking] = useState(null);
  const [countCategoryGenderMovie, setCountCategoryGenderMovie] = useState(null);
  const [countCategoryGenderGame, setCountCategoryGenderGame] = useState(null);
  /* 유저 순위 (게시글, 좋아요, 댓글) */
  const [userWriteRankDataList, setUserWriteRankDataList] = useState(null);
  const [userLikeRankDataList, setUserLikeRankDataList] = useState(null);
  const [userCommentRankDataList, setUserCommentRankDataList] = useState(null);

  useEffect(() => {
    axios.get("/api/admin/user")
      .then(response => {
        setUserWriteRankDataList(response.data.userWriteRankDataList);
        setUserLikeRankDataList(response.data.userLikeRankDataList);
        setUserCommentRankDataList(response.data.userCommentRankDataList);
        setIsLoading(false);
      })
  }, []);

  useEffect(() => {
    axios.get("/api/admin/board")
      .then(response => {
        const dataFromBoardList = response.data.boardDataList;

        // ------------------- 카테고리 별 게시글 수 (바) -------------------
        setCountCategoryBoard({
          labels: dataFromBoardList.map(data => data.name_eng),
          datasets: [{
            label: "카테고리 별 게시글 수",
            data: dataFromBoardList.map(data => data.count_category_board),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 3
          }]
        });

        // -------------------- 카테고리 별 조회수 합산 (라인) -------------------
        setCountCategoryView({
          labels: dataFromBoardList.map(data => data.name_eng),
          datasets: [{
            label: "카테고리 별 조회수",
            data: dataFromBoardList.map(data => data.count_category_view),
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            tension: 0.3
          }]
        });

        // -------------------- 카테고리 별 게시글 성비 (바) -------------------
        setCountCategoryGender({
          labels: dataFromBoardList.map(data => data.name_eng),
          datasets: [{
            label: "남성",
            data: dataFromBoardList.map(data => data.count_category_members_man),
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235)",
            borderWidth: 3
          }, {
            label: "여성",
            data: dataFromBoardList.map(data => data.count_category_members_woman),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132)",
            borderWidth: 3
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
              backgroundColor: ["rgba(54, 162, 235, 0.8)", "rgba(255, 99, 132, 0.8)"],
              hoverOffset: 4
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

  if (isLoading) {
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
            <LineChart chartData={countCategoryView}/>
          </Box>
          <Box bg={"whitesmoke"} h={"100%"} borderRadius={"30px"} p={"10px"}>
            <Flex mb={"10px"}>
              <DoughnutChartBox title="스포츠" chartData={countCategoryGenderSports}/>
              <DoughnutChartBox title="먹방" chartData={countCategoryGenderMukbang}/>
              <DoughnutChartBox title="일상" chartData={countCategoryGenderDaily}/>
            </Flex>
            <Flex>
              <DoughnutChartBox title="요리" chartData={countCategoryGenderCooking}/>
              <DoughnutChartBox title="영화/드라마" chartData={countCategoryGenderMovie}/>
              <DoughnutChartBox title="게임" chartData={countCategoryGenderGame}/>
            </Flex>
          </Box>
        </Flex>
        <Flex gap={2}>
          {/* ---------- 게시글 작성 순위 ---------- */}
          <Card w={"250px"} p={"10px"} alignItems={"center"}>
            <CardHeader>
              <Heading size='sm'>게시글 작성 순위</Heading>
            </CardHeader>

            {userWriteRankDataList.slice(0, 5).map((data) => (
              <Box key={data.member_id}>
                <VStack>
                  <Flex w={"200px"} mb={1}>
                    <Badge fontSize='xs' mr={2} variant={"outline"}
                           colorScheme={
                             data.write_rank === 1
                               ? "yellow"
                               : data.write_rank === 2
                                 ? "blue"
                                 : data.write_rank === 3
                                   ? "orange"
                                   : "white" // 기본 색상
                           }>
                      {data.write_rank}위
                    </Badge>
                    <Box minW={"100px"}>
                      <Heading size='xs'>
                        {data.member_id}
                      </Heading>
                    </Box>
                    <Text fontSize='xs'>
                      {data.write_count}개
                    </Text>
                  </Flex>
                </VStack>
              </Box>
            ))}
          </Card>

          {/* ---------- 좋아요 작성 순위 ---------- */}
          <Card w={"250px"} p={"10px"} alignItems={"center"}>
            <CardHeader>
              <Heading size='sm'>좋아요 작성 순위</Heading>
            </CardHeader>

            {userLikeRankDataList.slice(0, 5).map((data) => (
              <Box key={data.member_id}>
                <VStack>
                  <Flex w={"200px"} mb={1}>
                    <Badge fontSize='xs' mr={2} variant={"outline"}
                           colorScheme={
                             data.like_rank === 1
                               ? "yellow"
                               : data.like_rank === 2
                                 ? "blue"
                                 : data.like_rank === 3
                                   ? "orange"
                                   : "white" // 기본 색상
                           }>
                      {data.like_rank}위
                    </Badge>
                    <Box minW={"100px"}>
                      <Heading size='xs'>
                        {data.member_id}
                      </Heading>
                    </Box>
                    <Text fontSize='xs'>
                      {data.like_count}개
                    </Text>
                  </Flex>
                </VStack>
              </Box>
            ))}
          </Card>

          {/* ---------- 댓글 작성 순위 ---------- */}
          <Card w={"250px"} p={"10px"} alignItems={"center"}>
            <CardHeader>
              <Heading size='sm'>댓글 작성 순위</Heading>
            </CardHeader>

            {userCommentRankDataList.slice(0, 5).map((data) => (
              <Box key={data.member_id}>
                <VStack>
                  <Flex w={"200px"} mb={1}>
                    <Badge fontSize='xs' mr={2} variant={"outline"}
                           colorScheme={
                             data.comment_rank === 1
                               ? "yellow"
                               : data.comment_rank === 2
                                 ? "blue"
                                 : data.comment_rank === 3
                                   ? "orange"
                                   : "white" // 기본 색상
                           }>
                      {data.comment_rank}위
                    </Badge>
                    <Box minW={"100px"}>
                      <Heading size='xs'>
                        {data.member_id}
                      </Heading>
                    </Box>
                    <Text fontSize='xs'>
                      {data.comment_count}개
                    </Text>
                  </Flex>
                </VStack>
              </Box>
            ))}
          </Card>
        </Flex>
      </Box>
    </Flex>
  );
}

export default AdminMain;
