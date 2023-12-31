import { Box, Flex, Input, Select } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

export function SearchComponent() {
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("all");
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    // URL에 category가 있는 경우 해당 값을 설정
    if (params.has("category")) {
      params.get("category");
    }
  }, [params]);

  function handleSearchClick() {
    // board/list?p=9&c=title&k=자바
    // board/list?p=9&title=테스트
    const currentParams = new URLSearchParams(params);

    currentParams.set("t", type);
    currentParams.set("k", keyword);
    // navigate("?p=" + page + "&" + type + "=" + keyword);
    navigate("?" + currentParams);
  }

  return (
    <Flex mt={5} mb={5} width="100%" alignItems="center">
      <Select
        size="sm"
        width="45%"
        bg="white"
        onChange={(e) => setType(e.target.value)}
      >
        <option value="all">전체</option>
        <option value="title">제목</option>
        <option value="content">내용</option>
        <option value="nickname">작성자</option>
      </Select>
      <Input
        size={"sm"}
        mr="2"
        placeholder="검색어를 입력하세요."
        onChange={(e) => setKeyword(e.target.value)}
        bg={"white"}
      ></Input>
      <SearchIcon _hover={{ cursor: "pointer" }} onClick={handleSearchClick} />
    </Flex>
  );
}
