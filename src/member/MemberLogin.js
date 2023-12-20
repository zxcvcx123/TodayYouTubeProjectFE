import React, { useContext, useState } from "react";

/* 로그인 컴포넌트 */
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { DetectLoginContext } from "../component/LoginProvider";
import { Logo1Background_Removal, Logo1WithText3 } from "../assets/Image";

export function MemberLogin() {
  /* 아이디 */
  const [member_id, setMember_id] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const { loginInfo } = useContext(DetectLoginContext);
  if (loginInfo !== null) {
    navigate("/");
    toast({
      description: "로그아웃 후 이용 바랍니다.",
      status: "error",
    });
  }
  function handleLogin(event) {
    event.preventDefault();

    axios
      .post("/api/member/login", {
        member_id,
        password,
      })
      .then((response) => {
        localStorage.setItem("memberInfo", member_id);
        toast({
          description: "로그인 되었습니다.",
          status: "info",
        });
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          toast({
            description: "정지된 회원입니다.",
            status: "error",
          });
          navigate("/" + member_id);
        } else if (error.response && error.response.status === 400) {
          toast({
            description: "잘못된 접근입니다.",
            status: "warning",
          });
        } else if (error.response && error.response.status === 405) {
          toast({
            description: "탈퇴된 회원입니다.",
            status: "warning",
          });
        } else if (error.response && error.response.status === 404) {
          toast({
            description: "아이디와 암호를 다시 입력해주세요",
            status: "warning",
          });
        } else {
          toast({
            description: "아이디와 암호를 다시 입력해주세요",
            status: "warning",
          });
        }
      });
  }
  console.log("");
  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-0 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Center>
            <Image src={Logo1WithText3} w={"300px"} />
          </Center>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="member_id"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                아이디
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="member_id"
                  name="member_id"
                  autoComplete=""
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                  value={member_id}
                  onChange={(e) => setMember_id(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  비밀번호
                </label>
                <div className="text-sm">
                  <a className="font-semibold text-red-500 hover:text-red-400">
                    비밀번호를 잊으셨나요?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-red-500"
              >
                로그인
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            회원이 아니신가요?{" "}
            <a
              href="/member/signup"
              className="font-semibold leading-6 text-red-500 hover:text-red-400"
            >
              회원가입 하러가기
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default MemberLogin;
