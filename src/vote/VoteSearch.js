import React, { useState } from "react";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function VoteSearch({ params }) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  if (params.get("p") === null) {
    params.set("p", "1");
  }

  function handleSearchClick() {
    navigate("/board/vote/list?p=" + params.get("p") + "&k=" + keyword);
  }

  return (
    <Box>
      <Flex>
        <Input
          value={keyword}
          placeholder="주제를 입력해 주세요."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button>
          <SearchIcon
            _hover={{ cursor: "pointer" }}
            onClick={handleSearchClick}
          />
        </Button>
      </Flex>
    </Box>
  );
}

export default VoteSearch;
