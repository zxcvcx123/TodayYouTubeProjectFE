import YouTube from "react-youtube";
import { Box, Img, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// 유튜브 정보 추출 컴포넌트 - 썸네일, 영상을 추출합니다.
function YoutubeInfo({
  link,
  extraThumbnail,
  extraVideo,
  thumbnailWidth = 320,
  thumbnailHeight = 180,
  opts = { height: 360, width: 640 },
  toolTip,
}) {
  // 상태 값
  const location = useLocation();

  let thumbnail = null;
  let videoId = null;

  // 링크가 유효한지 첫번째 검사 (null or isBlack)
  if (link && link.trim() !== "") {
    // 유튜브 링크에서 동영상 ID 추출 (정규표현식 match 메서드)
    const videoIdMatch = link.match(
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );

    // 정규표현식 match 메서드 4번의 값으로 썸네일 추출
    if (videoIdMatch && videoIdMatch[4]) {
      const thumbnailUrl = `https://img.youtube.com/vi/${videoIdMatch[4]}/mqdefault.jpg`;
      thumbnail = thumbnailUrl;
      videoId = videoIdMatch[4];
    }
  } else {
    return null;
  }

  return (
    <div>
      {/* 프롭에 따라 썸네일, 유튜브영상 등을 선택해서 추출 가능 */}
      {/* 유튜브 썸네일 출력 => extraThumnail을 true로 설정 */}
      {/* thumbnailWidth, thumbnailHeight prop을 통해 길이 설정 가능, (기본값 320*180) */}
      {/* toolTip 을 true로 하면 이미지에 마우스 호버 시 툴팁으로 2배 적용된 이미지가 표시 된다.*/}
      {/* opt prop을 통해 영상의 크기 설정 가능*/}
      {extraThumbnail && (
        <>
          {toolTip && thumbnail !== null ? (
            <Tooltip
              label={
                <Img
                  src={thumbnail}
                  alt="유튜브 썸네일"
                  w={thumbnailWidth * 2}
                  h={thumbnailHeight * 2}
                />
              }
              placement="top-end"
            >
              {/* 링크가 null일 경우 임시 박스 삽입 */}
              {/* TODO : 임시 이미지 넣기 */}
              {thumbnail ? (
                <Img
                  src={thumbnail}
                  alt="유튜브 썸네일"
                  maxW={thumbnailWidth}
                  h={thumbnailHeight}
                />
              ) : (
                <Box
                  backgroundColor={"grey"}
                  maxW={thumbnailWidth}
                  h={thumbnailHeight}
                >
                  링크X 일 경우 임시 박스
                </Box>
              )}
            </Tooltip>
          ) : (
            <>
              {/* 링크가 null일 경우 임시 박스 삽입 */}
              {/* TODO : 임시 이미지 넣기 */}
              {thumbnail ? (
                <Img
                  src={thumbnail}
                  alt="유튜브 썸네일"
                  maxW={thumbnailWidth}
                  h={thumbnailHeight}
                />
              ) : (
                <Box
                  backgroundColor={"grey"}
                  maxW={thumbnailWidth}
                  h={thumbnailHeight}
                >
                  링크X 일 경우 임시 박스
                </Box>
              )}
            </>
          )}
        </>
      )}
      {/* 유튜브 영상 출력 => extraVideo를 true로 설정 */}
      {extraVideo && <YouTube videoId={videoId} opts={opts} />}
    </div>
  );
}

export default YoutubeInfo;
