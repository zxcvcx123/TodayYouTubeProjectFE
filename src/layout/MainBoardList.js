import {
  Box,
  Divider,
  Flex,
  List,
  ListIcon,
  ListItem,
  OrderedList,
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
    <Flex
      width="70%"
      m="auto"
      border="1px"
      height={"300"}
      justifyContent={"space-around"}
    >
      <Box width="40%" border="1px" borderColor={"blue"} padding={6}>
        스포츠
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
      <Box width="40%" border="1px" borderColor={"blue"} padding={6}>
        먹방
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
    </Flex>
  );
}
