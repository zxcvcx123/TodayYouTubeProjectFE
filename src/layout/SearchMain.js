import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Flex, Input, Select } from "@chakra-ui/react";

export function SearchMain() {
  return (
    <Flex width={600}>
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
      <Box width={500}>
        <Input fontSize={13} placeholder="검색어를 입력하세요" />
      </Box>
      <Button width={100}>
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </Flex>
  );
}
