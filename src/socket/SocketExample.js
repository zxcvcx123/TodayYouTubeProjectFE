// import {
//   Avatar,
//   Badge,
//   Box,
//   Button,
//   Divider,
//   Flex,
//   HStack,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   Stack,
//   Text,
// } from "@chakra-ui/react";
// import * as PropTypes from "prop-types";
// import React, { useContext, useEffect, useRef, useState } from "react";
// import { ChevronDownIcon } from "@chakra-ui/icons";
// import { SearchMain } from "./SearchMain";
// import { faBell } from "@fortawesome/free-regular-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useLocation, useNavigate } from "react-router-dom";
// import { DetectLoginContext } from "../component/LoginProvider";
// import MemberProfile from "../member/MemberProfile";
// import * as SockJS from "sockjs-client";
// import { Stomp } from "@stomp/stompjs";
//
// Stack.propTypes = {
//   p: PropTypes.number,
//   h: PropTypes.string,
//   direction: PropTypes.string,
//   children: PropTypes.node,
// };
//
// function Nav({ setSocket }) {
//   const { token, handleLogout, loginInfo, validateToken } =
//     useContext(DetectLoginContext);
//   let navigate = useNavigate();
//
//   // 소켓 연결
//   const stompClient = useRef(); // useRef로 connect()가 안끊기게하기
//   const subscription = useRef(null);
//
//   function connect() {
//     // 기존 연결방식
//     // let socket = new SockJS("http://localhost:3000/ws", null, {
//     //   transports: ["websocket", "xhr-streaming", "xhr-polling"],
//     // });
//
//     console.log(stompClient.current);
//
//     // 이미 연결되어 있으면 한번 더 연결시키는거 방지
//     // 추천 연결방식
//     if (!stompClient.current) {
//       stompClient.current = Stomp.over(function () {
//         return new SockJS("http://localhost:3000/ws", "ws", {
//           transports: ["websocket", "xhr-streaming", "xhr-polling"],
//         });
//       });
//       stompClient.current.connect({}, function (frame) {
//         unSubscribe();
//         console.log("NAV에서 소켓연결 성공: " + frame);
//         console.log(stompClient.current);
//         console.log(frame);
//
//         setSocket(stompClient);
//       });
//     }
//   }
//
//   // ===== 두번 연결 되니깐 한번은 끊어줌 =====ㄷ
//   function unSubscribe() {
//     if (subscription.current !== null) {
//       subscription.current.unsubscribe();
//     }
//   }
//   // ========================================
//
//   useEffect(() => {
//     connect();
//   }, []);
//
//   return (
//     <>
//       <Flex
//         ml="100px"
//         mt={2}
//         h="100px"
//         w="80%"
//         alignItems="center"
//         justifyContent={"space-around"}
//       >
//         <Button
//           borderStyle={"solid"}
//           size="md"
//           variant="ghost"
//           onClick={() => {
//             navigate("/");
//           }}
//         >
//           로고
//         </Button>
//         <Flex>
//           <Button w={120} borderStyle={"solid"} size="md" variant="ghost">
//             TOP
//           </Button>
//           <Menu>
//             <MenuButton as={Button} w={120} size="md" variant="ghost">
//               게시판
//               <ChevronDownIcon />
//             </MenuButton>
//             <MenuList>
//               <MenuItem onClick={() => navigate("board/list")}>스포츠</MenuItem>
//               <MenuItem>먹방</MenuItem>
//               <MenuItem>일상</MenuItem>
//               <MenuItem>요리</MenuItem>
//               <MenuItem>영화/드라마</MenuItem>
//               <MenuItem>게임</MenuItem>
//               <MenuItem onClick={() => navigate("/chat")}>채팅</MenuItem>
//               <Divider />
//               <MenuItem onClick={() => navigate("/inquiry/list")}>
//                 문의게시판
//               </MenuItem>
//             </MenuList>
//           </Menu>
//         </Flex>
//         <Box>
//           <SearchMain />
//         </Box>
//
//         <Flex gap={10} mar>
//           <Flex gap={6} justifyContent={"center"} alignItems={"center"}>
//             {token.detectLogin ? (
//               <>
//                 <Button w={70} size="md" variant="ghost">
//                   <FontAwesomeIcon fontSize={"20px"} icon={faBell} />
//                 </Button>
//                 <Menu w={200} size="md" variant="ghost">
//                   <MenuButton>
//                     <MemberProfile />
//                   </MenuButton>
//                   <MenuList>
//                     <MenuItem
//                       onClick={() => {
//                         handleLogout();
//                         navigate("/");
//                       }}
//                     >
//                       로그아웃
//                     </MenuItem>
//                     <Divider />
//                     <MenuItem
//                       onClick={() => {
//                         navigate("/member/info");
//                       }}
//                     >
//                       마이페이지
//                     </MenuItem>
//                     <MenuItem>준비중</MenuItem>
//                   </MenuList>
//                 </Menu>
//               </>
//             ) : (
//               <>
//                 <Button
//                   onClick={() => {
//                     navigate("member/login");
//                   }}
//                   w={90}
//                   size="md"
//                   variant="ghost"
//                 >
//                   로그인
//                 </Button>
//               </>
//             )}
//           </Flex>
//         </Flex>
//       </Flex>
//     </>
//   );
// }
//  /* ========================================================================================================== */
//  /* ========================================================================================================== */
//  /* ========================================================================================================== */
// import React, { useContext, useEffect, useRef, useState } from "react";
// import * as SockJS from "sockjs-client";
// import * as StompJS from "@stomp/stompjs";
// import { Stomp } from "@stomp/stompjs";
// import {
//   Box,
//   Button,
//   Center,
//   Flex,
//   Input,
//   Spinner,
//   Text,
// } from "@chakra-ui/react";
// import { useOutletContext } from "react-router-dom";
// import { DetectLoginContext } from "../component/LoginProvider";
//
// function Chat() {
//   let stompClient;
//
//   const { token, loginInfo } = useContext(DetectLoginContext);
//   const { socket } = useOutletContext();
//
//   const [text, setText] = useState("");
//   const [chatId, setChatId] = useState("");
//   //const [chat, setChat] = useState([]);
//   const [setIdAccess, setSetIdAccess] = useState(false);
//   const [connection, setConnection] = useState(true);
//
//   stompClient = useRef();
//   const subscription = useRef(null);
//
//   useEffect(() => {
//
//     if (loginInfo.member_id !== "") {
//       setSetIdAccess(true);
//       setChatId(loginInfo.member_id);
//     }
//
//     if (socket !== null) {
//       getSocket();
//     }
//   }, [loginInfo]);
//
//   if (socket !== null) {
//     stompClient = socket;
//     getSocket();
//   }
//
//   if (socket === null) {
//     return <Spinner />;
//   }
//
//   // 채팅내용
//   function sendMsg() {
//     stompClient.current.publish({
//       destination: "/app/hello",
//       body: JSON.stringify({ id: chatId, chat: text }),
//     });
//   }
//
//   // 아이디 등록하기
//   function sendId() {
//     if (chatId.length > 0) {
//       setSetIdAccess(true);
//     }
//   }
//
//   function disconnectSocket() {
//     stompClient.current.disconnect();
//     console.log("소켓통신 종료");
//     console.log(stompClient.current);
//     setSetIdAccess(false);
//     setConnection(false);
//   }
//
//   // 채팅내용
//   function handleTextInput(e) {
//     setText(e.target.value);
//   }
//
//   // 아이디 입력
//   function handleChatId(e) {
//     setChatId(e.target.value);
//   }
//
//   // 채팅창 가져오기
//   function getSocket() {
//     console.log("Chat에서 소켓 연결");
//
//     unSubscribe();
//     subscription.current = stompClient.current.subscribe(
//       "/topic/greetings",
//       (res) => {
//         JSON.parse(res.body);
//         console.log(JSON.parse(res._body));
//         const json = JSON.parse(res._body);
//
//         if (json.chat !== null) {
//           document
//             .getElementById("chatArea")
//             .insertAdjacentHTML(
//               "beforeend",
//               "<p>" + json.id + ": " + json.chat + "</p>",
//             );
//         }
//
//         // =========================================
//         // const newContent = JSON.parse(res._body);
//         // setContent(newContent);
//         // const newChat = [...chat];
//         // newChat.push(newContent.chat);
//         // setChat(newChat);
//         // =========================================
//
//         // return setChat((chatList) => [...chatList, json]);
//       },
//     );
//   }
//
//   // ===== 두번 연결 되니깐 한번은 끊어줌 =====
//   function unSubscribe() {
//     if (subscription.current !== null) {
//       subscription.current.unsubscribe();
//     }
//   }
//   // ========================================
//
//   return (
//     <>
//       {/*{setIdAccess || (*/}
//       {/*  <Center>*/}
//       {/*    <Flex w={"50%"}>*/}
//       {/*      <Input*/}
//       {/*        value={chatId}*/}
//       {/*        onChange={handleChatId}*/}
//       {/*        placeholder="아이디를 입력해주세요"*/}
//       {/*      />*/}
//       {/*      <Button onClick={sendId}>입력</Button>*/}
//       {/*    </Flex>*/}
//       {/*  </Center>*/}
//       {/*)}*/}
//       {setIdAccess && (
//         <Center>
//           <Box w={"50%"} h={"500px"}>
//             <Center>
//               <Box
//                 border={"1px solid black"}
//                 w={"100%"}
//                 textAlign={"center"}
//                 h={"50px"}
//               >
//                 {chatId}님 반갑습니다.
//               </Box>
//             </Center>
//
//             <Center>
//               <Box
//                 id="chatArea"
//                 w={"100%"}
//                 border={"1px solid black"}
//                 textIndent={"15px"}
//                 h={"400px"}
//                 id="chatArea"
//               ></Box>
//             </Center>
//
//             <Center>
//               <Flex w={"100%"} h={"50px"}>
//                 <Input value={text} onChange={handleTextInput} />
//                 <Button onClick={sendMsg}>입력</Button>
//                 <Button onClick={disconnectSocket}>종료</Button>
//               </Flex>
//             </Center>
//           </Box>
//         </Center>
//       )}
//     </>
//   );
// }
//
// /* ========================================================================================================== */
// /* ========================================================================================================== */
// /* ========================================================================================================== */
// import React, { useContext, useEffect, useRef, useState } from "react";
// import { Box, Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
// import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
// import { useOutletContext } from "react-router-dom";
// import * as SockJS from "sockjs-client";
// import * as StompJS from "@stomp/stompjs";
// import { Stomp } from "@stomp/stompjs";
// import { DetectLoginContext } from "../component/LoginProvider";
// import axios from "axios";
//
// // 게시물 조회시 좋아요 출력
// function BoardLike({ id }) {
//   const { loginInfo } = useContext(DetectLoginContext);
//
//   // 소켓
//   let stompClient;
//   const { socket } = useOutletContext();
//   stompClient = useRef();
//   const subscription = useRef(null);
//
//   const [countLike, setCountLike] = useState(null);
//   const [like, setLike] = useState(null);
//
//   useEffect(() => {
//     axios
//       .post("/api/like/board", {
//         board_id: id,
//         member_id: localStorage.getItem("memberInfo"),
//       })
//       .then((response) => {
//         setCountLike(response.data.countlike);
//         setLike(response.data.like);
//       })
//       .catch(() => console.log("bad"))
//       .finally(() => console.log("완료"));
//
//     // if (socket !== null) {
//     //   getSocket();
//     // }
//   }, []);
//
//   if (socket !== null) {
//     stompClient = socket;
//     getSocket();
//   }
//
//   if (socket === null) {
//     return <Spinner />;
//   }
//
//   // ===== 두번 연결 되니깐 한번은 끊어줌 =====
//   function unSubscribe() {
//     if (subscription.current !== null) {
//       subscription.current.unsubscribe();
//     }
//   }
//   // ========================================
//
//   // 좋아요 가져오기
//   function getSocket() {
//     console.log("BoardLike에서 소켓연결");
//     unSubscribe();
//
//     subscription.current = stompClient.current.subscribe(
//       "/topic/like",
//       (res) => {
//         console.log(res.body);
//         const data = JSON.parse(res.body);
//         setCountLike(data.countlike);
//
//         // return setArr((arr) => [...arr, data.checkId]);
//       },
//     );
//
//     subscription.current = stompClient.current.subscribe(
//       "/queue/like/" + localStorage.getItem("memberInfo"),
//       (res1) => {
//         console.log(res1.body);
//         const data1 = JSON.parse(res1.body);
//         setLike(data1.like);
//       },
//     );
//   }
//
//   function send() {
//     stompClient.current.publish({
//       destination: "/app/like/add/" + localStorage.getItem("memberInfo"),
//       body: JSON.stringify({
//         board_id: id,
//         member_id: localStorage.getItem("memberInfo"),
//       }),
//     });
//
//     stompClient.current.publish({
//       destination: "/app/like/",
//       body: JSON.stringify({
//         board_id: id,
//         member_id: localStorage.getItem("memberInfo"),
//       }),
//     });
//   }
//
//   return (
//     <>
//       <Flex>
//         <Button
//           onClick={() => {
//             send();
//           }}
//         >
//           {like === 1 ? (
//             <FontAwesomeIcon icon={fullHeart} />
//           ) : (
//             <FontAwesomeIcon icon={emptyHeart} />
//           )}
//         </Button>
//
//         <Heading>{countLike}</Heading>
//       </Flex>
//     </>
//   );
// }
//
