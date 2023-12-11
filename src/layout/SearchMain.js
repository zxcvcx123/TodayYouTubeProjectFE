import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Flex, Input, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function SearchMain() {
  const [allSearch, setAllSearch] = useState("");
  const params = new URLSearchParams();

  const navigate = useNavigate();

  function handleAllSearch() {
    params.set("allSearch", allSearch);
    navigate("/search/?" + params);
  }

  return (
    <Flex width={600}>
      <Box>
        <Select fontSize={13}>
          <option value="all">통합검색</option>
          <option value="category">스포츠</option>
          <option value="category">먹방</option>
          <option value="category">일상</option>
          <option value="category">요리</option>
          <option value="category">영화/드라마</option>
          <option value="category">게임</option>
        </Select>
      </Box>
      <Box width={400}>
        <Input
          fontSize={13}
          placeholder="검색어를 입력하세요"
          value={allSearch}
          onChange={(e) => setAllSearch(e.target.value)}
        />
      </Box>
      <Button width={100}>
        <FontAwesomeIcon icon={faSearch} onClick={handleAllSearch} />
      </Button>
    </Flex>
  );
}
