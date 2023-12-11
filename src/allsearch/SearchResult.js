import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

function SearchResult(props) {
  const [params] = useSearchParams();
  const [allCategoryBoardList, setAllCategoryBoardList] = useState(null);
  const [categoryResultThree, setCategoryResultThree] = useState(null);

  const location = useLocation();

  useEffect(() => {
    axios.get("/api/search?" + params).then((response) => {
      setAllCategoryBoardList(response.data.searchResultMenu);
    });
  }, [location]);

  if (allCategoryBoardList == null) {
    return <Spinner />;
  }

  return (
    <Box w={"70%"} m={"auto"}>
      <Heading mb={5}>게시판내의 검색결과입니다.</Heading>
      {allCategoryBoardList.searchResultMenuList &&
        allCategoryBoardList.searchResultMenuList.map((allBoard) => (
          <Box>
            <Flex
              as={Button}
              variant={"link"}
              color={"black"}
              mb={5}
              size={"lg"}
            >
              - {allBoard.resultCategory}게시판의{" "}
              <Box ml={2} mr={2} fontWeight={"bold"}>
                '{params.get("allSearch")}'
              </Box>
              검색결과
              <Text fontWeight={"bold"} variant={"link"} color={"gray.500"}>
                ({allBoard.categoryCount})
              </Text>
            </Flex>
          </Box>
        ))}
    </Box>
  );
}

export default SearchResult;
