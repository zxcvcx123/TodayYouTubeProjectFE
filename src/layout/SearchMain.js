import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Flex, Input, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export function SearchMain() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const location = useLocation();

  useEffect(() => {
    // URL에 category가 있는 경우 해당 값을 설정
    if (params.has("category")) {
      params.set("category", "all");
    }
  }, [location]);

  function handleSearchClick() {
    // board/list?p=9&c=title&k=자바
    // board/list?p=9&title=테스트
    const currentParams = new URLSearchParams(params);
    if (!params.has("category")) {
      currentParams.set("category", "all");
      currentParams.set("k", keyword);
    }

    currentParams.set("k", keyword);
    currentParams.delete("s");
    currentParams.delete("p");
    // navigate("?p=" + page + "&" + type + "=" + keyword);
    navigate("/board/list?" + currentParams);
  }

  return (
    <Flex width={400}>
      {/*<Box>*/}
      {/*  <Select fontSize={13}>*/}
      {/*    <option value="all">통합검색</option>*/}
      {/*    <option value="category">스포츠</option>*/}
      {/*    <option value="category">먹방</option>*/}
      {/*    <option value="category">일상</option>*/}
      {/*    <option value="category">요리</option>*/}
      {/*    <option value="category">영화/드라마</option>*/}
      {/*    <option value="category">게임</option>*/}
      {/*  </Select>*/}
      {/*</Box>*/}
      <Box width={300}>
        <Input
          fontSize={13}
          placeholder="[게시판 통합검색] 검색어를 입력하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          borderRightRadius={0}
          style={{ fontFamily: "Nanum Gothic" }}
        />
      </Box>
      <Button
        width={70}
        onClick={handleSearchClick}
        colorScheme="red"
        borderLeftRadius={0}
      >
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </Flex>
  );
}
