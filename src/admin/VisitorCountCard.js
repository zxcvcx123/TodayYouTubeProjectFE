import React, { useEffect, useState } from "react";
import { Badge, Card, Flex, Text } from "@chakra-ui/react";
import axios from "axios";

function VisitorCountCard() {
  /* 전체, 오늘 방문자 수 */
  const [countVisitorAll, setCountVisitorAll] = useState(null);
  const [countVisitorToday, setCountVisitorToday] = useState(null);

  // 방문자 데이터 불러와 state 세팅 및 라인차트 세팅
  useEffect(() => {
    // 방문자 통계 데이터 가져오기
    // visitorCountAll, visitorCountToday, visitorCountMonthlyLastYear
    axios.get("/api/getVisitorCount").then((response) => {
      setCountVisitorAll(response.data.visitorCountAll);
      setCountVisitorToday(response.data.visitorCountToday);
    });
  }, []);

  return (
    <Card
      p={1}
      w={"200px"}
      backgroundColor={"transparent"}
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
    >
      <Flex>
        <Text mb={1} fontWeight={"bold"}
              style={{ fontFamily: "Nanum Gothic" }}
        >
          전체 방문자 수
          <Badge mx={1} fontSize="13px" colorScheme="green">
            {countVisitorAll}
          </Badge>
          명
        </Text>
      </Flex>
      <Flex>
        <Text fontWeight={"bold"}
              style={{ fontFamily: "Nanum Gothic" }}
        >
          오늘 방문자 수
          <Badge mx={1} fontSize="13px" colorScheme="blue">
            {countVisitorToday}
          </Badge>
          명
        </Text>
      </Flex>
    </Card>
  );
}

export default VisitorCountCard;
