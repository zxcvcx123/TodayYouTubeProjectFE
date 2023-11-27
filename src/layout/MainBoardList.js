import {
  Box,
  Divider,
  Flex,
  List,
  ListIcon,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Icon, createIcon } from "@chakra-ui/react";

export function MainBoardList() {
  // chakra ui 버튼 커스텀
  const CircleIcon = (props) => (
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );

  return (
    <Box>
      <Flex
        width="70%"
        m="auto"
        mt={"50px"}
        border="1px"
        height={"300"}
        justifyContent={"space-around"}
      >
        <Box width="40%" border="1px" borderColor={"blue"} padding={6}>
          <Text fontSize="1.2rem" mb={"10px"}>
            통합 최다 추천글
          </Text>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CircleIcon} color="red.500" />
              통합 최다 추천글 첫 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              통합 최다 추천글 두 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              통합 최다 추천글 세 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              통합 최다 추천글 네 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              통합 최다 추천글 다섯 번째 글 title
            </ListItem>
            <Divider />
          </List>
        </Box>
        <Box width="40%" border="1px" borderColor={"blue"} padding={6}>
          <Text fontSize="1.2rem" mb={"10px"}>
            [관심남]님의 최신 글
          </Text>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CircleIcon} color="red.500" />
              [관심남]님의 최신 첫 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              [관심남]님의 최신 두 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              [관심남]님의 최신 세 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              [관심남]님의 최신 네 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              [관심남]님의 최신 다섯 번째 글 title
            </ListItem>
            <Divider />
          </List>
        </Box>
      </Flex>
      <Flex
        width="70%"
        ml="15%"
        mt={"50px"}
        border="1px"
        height={"300"}
        justifyContent={"space-evenly"}
      >
        <Box width="27%" border="1px" borderColor={"blue"} padding={6}>
          <Text fontSize="1.2rem" mb={"10px"}>
            스포츠
          </Text>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CircleIcon} color="red.500" />
              스포츠 첫 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              스포츠 두 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              스포츠 세 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              스포츠 네 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              스포츠 다섯 번째 글 title
            </ListItem>
            <Divider />
          </List>
        </Box>
        <Box width="27%" border="1px" borderColor={"blue"} padding={6}>
          <Text fontSize="1.2rem" mb={"10px"}>
            먹방
          </Text>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CircleIcon} color="red.500" />
              먹방 첫 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              먹방 두 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              먹방 세 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              먹방 네 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              먹방 다섯 번째 글 title
            </ListItem>
            <Divider />
          </List>
        </Box>
        <Box width="27%" border="1px" borderColor={"blue"} padding={6}>
          <Text fontSize="1.2rem" mb={"10px"}>
            게임
          </Text>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CircleIcon} color="red.500" />
              게임 첫 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              게임 두 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              게임 세 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              게임 네 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              게임 다섯 번째 글 title
            </ListItem>
            <Divider />
          </List>
        </Box>
      </Flex>
      <Flex
        width="70%"
        ml="15%"
        mt={"50px"}
        border="1px"
        height={"300"}
        justifyContent={"space-evenly"}
      >
        <Box width="27%" border="1px" borderColor={"blue"} padding={6}>
          <Text fontSize="1.2rem" mb={"10px"}>
            일상
          </Text>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CircleIcon} color="red.500" />
              일상 첫 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              일상 두 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              일상 세 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              일상 네 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              일상 다섯 번째 글 title
            </ListItem>
            <Divider />
          </List>
        </Box>
        <Box width="27%" border="1px" borderColor={"blue"} padding={6}>
          <Text fontSize="1.2rem" mb={"10px"}>
            영화/드라마
          </Text>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CircleIcon} color="red.500" />
              영화/드라마 첫 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              영화/드라마 두 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              영화/드라마 세 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              영화/드라마 네 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              영화/드라마 다섯 번째 글 title
            </ListItem>
            <Divider />
          </List>
        </Box>
        <Box width="27%" border="1px" borderColor={"blue"} padding={6}>
          <Text fontSize="1.2rem" mb={"10px"}>
            패션
          </Text>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CircleIcon} color="red.500" />
              패션 첫 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              패션 두 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              패션 세 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              패션 네 번째 글 title
            </ListItem>
            <Divider />
            <ListItem>
              <ListIcon as={CircleIcon} />
              패션 다섯 번째 글 title
            </ListItem>
            <Divider />
          </List>
        </Box>
      </Flex>
    </Box>
  );
}
