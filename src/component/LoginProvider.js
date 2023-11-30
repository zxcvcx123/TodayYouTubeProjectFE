import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const DetectLoginContext = createContext(null);
// 로그인 만료 시간
const loginActivityTimeOut = 30 * 60 * 1000;
// 사용자 활동을 감지 타이머
let loginActivityTimer = null;
export function LoginProvider({ children }) {
  const location = useLocation();
  const [token, setToken] = useState({
    detectLogin: false,
    accessToken: null,
    refreshToken: null,
    authorithy: null,
    memberInfo: null,
  });
  const [loginInfo, setLoginInfo] = useState({
    member_id: "",
    nickname: "",
    email: "",
    phone_number: "",
    birth_date: null,
  });

  useEffect(() => {
    validateToken();
  }, [location]);

  function validateToken() {
    const grantType = localStorage.getItem("grantType");
    const accessToken = localStorage.getItem("accessToken");
    const authority = localStorage.getItem("authority");
    const memberInfo = localStorage.getItem("memberInfo");

    console.log(grantType);
    console.log(accessToken);
    console.log(authority);
    console.log(memberInfo);

    axios({
      method: "get",
      url: "/api/member/loginProvider",
      headers: {
        Authorization: `${grantType} ${accessToken}`,
      },
    })
      .then((response) => {
        setLoginInfo((prevState) => ({
          ...prevState,
          member_id: response.data.member_id,
          nickname: response.data.nickname,
          email: response.data.email,
          phone_number: response.data.phone_number,
          birth_date: response.data.birth_date,
        }));

        setToken((prevState) => ({
          ...prevState, // 객체의 모든 속성을 새로운 객체에 복사
          detectLogin: true,
        }));
      })
      .catch((error) => {
        setToken((prevState) => ({
          ...prevState,
          detectLogin: false,
          accessToken: null,
          refreshToken: null,
          authorithy: null,
          memberInfo: null,
        }));
        console.log(error.response.status);
      });
  }

  // 사용자 활동을 감지

  const logout = () => {
    setToken({
      detectLogin: false,
      accessToken: null,
      refreshToken: null,
      authorithy: null,
      memberInfo: null,
    });
    localStorage.clear();
  };

  return (
    <>
      <DetectLoginContext.Provider
        value={{ detectLogin: token.detectLogin, logout, loginInfo }}
      >
        {children}
      </DetectLoginContext.Provider>
    </>
  );
}

export default LoginProvider;
