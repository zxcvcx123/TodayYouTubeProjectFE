import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export let DetectLoginContext = createContext(null);
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
    id: "",
    member_id: "",
    nickname: "",
    email: "",
    phone_number: "",
    birth_date: null,
    role_name: "",
    total_like: "",
  });

  useEffect(() => {
    validateToken();
  }, [location]);

  function validateToken() {
    const grantType = localStorage.getItem("grantType");
    const accessToken = localStorage.getItem("accessToken");
    const authority = localStorage.getItem("authority");
    const memberInfo = localStorage.getItem("memberInfo");
    console.log(memberInfo);
    // 응답 인터셉터
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.clear();
        }
        return Promise.reject(error);
      },
    );

    axios({
      method: "post",
      url: "/api/member/loginProvider",
      params: { member_id: memberInfo },
      headers: {
        Authorization: `${grantType} ${accessToken}`,
      },
    })
      .then((response) => {
        console.log(response.data.id);
        setLoginInfo((prevState) => ({
          ...prevState,
          id: response.data.id,
          member_id: response.data.member_id,
          nickname: response.data.nickname,
          email: response.data.email,
          phone_number: response.data.phone_number,
          birth_date: response.data.birth_date,
          role_name: response.data.role_name,
          total_like: response.data.total_like,
        }));

        setToken((prevState) => ({
          ...prevState, // 객체의 모든 속성을 새로운 객체에 복사
          detectLogin: true,
        }));
      })
      .catch((error) => {
        localStorage.clear();
        setLoginInfo((prevState) => ({
          ...prevState,
          id: "",
          member_id: "",
          nickname: "",
          email: "",
          phone_number: "",
          birth_date: null,
          role_name: "",
          total_like: "",
        }));
        setToken((prevState) => ({
          ...prevState,
          detectLogin: false,
        }));
      });
  }

  // 사용자 활동을 감지

  const handleLogout = () => {
    setLoginInfo(() => ({
      id: "",
      member_id: "",
      nickname: "",
      email: "",
      phone_number: "",
      birth_date: null,
      role_name: "",
      total_like: "",
    }));

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
        value={{ token, handleLogout, loginInfo, validateToken }}
      >
        {children}
      </DetectLoginContext.Provider>
    </>
  );
}

export default LoginProvider;
