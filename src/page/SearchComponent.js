import { Box, Flex, Input, Select } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

export function SearchComponent() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();

  function handleSearchClick() {
    //   board/list?p=9&c=title&k=자바
    // board/list?p=9&title=테스트

    const params = new URLSearchParams();
    params.set("c", category);
    params.set("k", keyword);
    // navigate("?p=" + page + "&" + category + "=" + keyword);
    navigate("?" + params);
  }

  return (
    <Flex mt={5} mb={5} width="100%" alignItems="center">
      <Select
        size="sm"
        width="45%"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">제목+내용</option>
        <option value="title">제목</option>
        <option value="content">내용</option>
        <option value="board_member_id">작성자</option>
      </Select>
      <Input
        size={"sm"}
        mr="2"
        onChange={(e) => setKeyword(e.target.value)}
      ></Input>
      <SearchIcon _hover={{ cursor: "pointer" }} onClick={handleSearchClick} />
    </Flex>
  );
}
