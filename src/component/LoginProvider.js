import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import memberInfo from "../member/memberInfo/MemberInfo";

export let DetectLoginContext = createContext(null);
// 로그인 만료 시간
const loginActivityTimeOut = 30 * 60 * 1000;
// 사용자 활동을 감지 타이머
let loginActivityTimer = null;

export function LoginProvider({ children }) {
  const location = useLocation();
  const [token, setToken] = useState({
    detectLogin: false,
  });
  const [loginInfo, setLoginInfo] = useState(null);

  const memberInfo = localStorage.getItem("memberInfo");
  useEffect(() => {
    const fetchData = async () => {
      validateToken();
    };
    fetchData();
  }, [location]);

  function validateToken() {
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
    })
      .then((response) => {
        setLoginInfo((prevState) => ({
          ...prevState,
          id: response.data.id,
          member_id: response.data.member_id,
          nickname: response.data.nickname,
          email: response.data.email,
          phone_number: response.data.phone_number,
          birth_date: response.data.birth_date,
          gender: response.data.gender,
          role_name: response.data.role_name,
          total_like: response.data.total_like,
          total_board: response.data.total_board,
          total_comment: response.data.total_comment,
          total_views: response.data.total_views,
          image_url: response.data.url,
        }));

        setToken((prevState) => ({
          ...prevState, // 객체의 모든 속성을 새로운 객체에 복사
          detectLogin: true,
        }));
      })
      .catch((error) => {
        setLoginInfo(null);
        setToken((prevSState) => ({
          detectLogin: false,
        }));
      })
      .finally(() => {
        localStorage.clear();
      });
  }

  // 사용자 활동을 감지

  const handleLogout = () => {
    localStorage.clear();
    axios.post("/api/member/logout").finally(() => {
      setLoginInfo(null);

      setToken({
        detectLogin: false,
      });
      window.location.reload();
    });
  };

  return (
    <>
      {/* token: 토큰 정보 token.detectLogin (로그인 유무 확인)
          handleLogout: 로그아웃 기능
          loginInfo: 로그인 사용자 정보(memberId, nickname, role_id, email)
      */}
      <DetectLoginContext.Provider
        value={{ token, handleLogout, loginInfo, validateToken }}
      >
        {children}
      </DetectLoginContext.Provider>
    </>
  );
}

export default LoginProvider;
