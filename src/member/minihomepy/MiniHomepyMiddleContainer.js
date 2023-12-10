import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons/faHouseUser";
import {
  faArrowRightToBracket,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import "./minihomepy-styles/content.css";
import { Text } from "@chakra-ui/react";
import { ArrowForwardIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function MiniHomepyMiddleContent({ name }) {
  return (
    <>
      <div className="popup">
        <h2>{name}</h2>
        {name === "Home" && <Text>홈이다!!!!!!</Text>}
        {name === "Hello" && <Text>안녕이다!!!!!!</Text>}
        {/* 여기에 각 팝업의 내용을 추가 */}
      </div>
    </>
  );
}

export function MiniHomepyMiddleContainer() {
  let navigate = useNavigate();
  useEffect(() => {
    const list = document.querySelectorAll(".list");
    function activeLink() {
      console.log("실행됨!");
      list.forEach((item) => {
        item.classList.remove("active");
      });
      this.classList.add("active");
    }

    list.forEach((item) => {
      item.addEventListener("click", activeLink);
    });
    return () => {
      list.forEach((item) => {
        item.removeEventListener("click", activeLink);
      });
    };
  }, []);

  const [activePopup, setActivePopup] = useState("Home");

  // 팝업을 표시하는 함수
  const showPopup = (popupName) => {
    setActivePopup(popupName);
  };

  return (
    <>
      {activePopup && <MiniHomepyMiddleContent name={activePopup} />}

      <div className="container">
        <div className="navigation">
          <HamburgerIcon
            color="white"
            fontSize="1.5em"
            position={"absolute"}
            left={"10"}
          />
          <ul>
            <li
              className="list active"
              onClick={() => {
                showPopup("Home");
              }}
            >
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faHouseUser} />
                </span>
                <span className="text">Home</span>
                <span className="circle"></span>
              </a>
            </li>{" "}
            <li
              className="list"
              onClick={() => {
                showPopup("Hello");
              }}
            >
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faComments} />
                </span>
                <span className="text">Profile</span>
                <span className="circle"></span>
              </a>
            </li>{" "}
            <li className="list">
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faComments} />
                </span>
                <span className="text">Message</span>
                <span className="circle"></span>
              </a>
            </li>{" "}
            <li className="list">
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faHeart} />
                </span>
                <span className="text">Photos</span>
                <span className="circle"></span>
              </a>
            </li>{" "}
            <li className="list">
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faComments} />
                </span>
                <span className="text">Settings</span>
                <span className="circle"></span>
              </a>
            </li>
            <div className="indicator"></div>
          </ul>
          <ArrowForwardIcon
            color="white"
            fontSize="1.8em"
            position={"absolute"}
            right={"10"}
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
      </div>
    </>
  );
}
