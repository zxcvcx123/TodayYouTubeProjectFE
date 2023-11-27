import YouTube from "react-youtube";
import { Img } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// 유튜브 정보 추출 컴포넌트 - 썸네일, 영상을 추출합니다.
function YoutubeInfo({
  link,
  extraThumbnail,
  extraVideo,
  thumbnailWidth = 320,
  thumbnailHeight = 180,
}) {
  // 상태 값
  const [thumbnail, setThumbnail] = useState(null);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    // 유튜브 링크에서 동영상 ID 추출 (정규표현식 match 메서드)
    const videoIdMatch = link.match(
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );

    // 정규표현식 match 메서드 4번의 값으로 썸네일 추출
    if (videoIdMatch && videoIdMatch[4]) {
      const thumbnailUrl = `https://img.youtube.com/vi/${videoIdMatch[4]}/mqdefault.jpg`;
      setThumbnail(thumbnailUrl);
      setVideoId(videoIdMatch[4]);
    }
  }, []);

  return (
    <div>
      {/* 프롭에 따라 썸네일, 유튜브영상 등을 선택해서 추출 가능 */}
      {/* 유튜브 썸네일 출력 => extraThumnail을 true로 설정 */}
      {/* thumbnailWidth, thumbnailHeight prop을 통해 길이 설정 가능, (기본값 320*180) */}
      {extraThumbnail && (
        <Img
          src={thumbnail}
          alt="유튜브 썸네일"
          w={thumbnailWidth}
          h={thumbnailHeight}
        />
      )}
      {/* 유튜브 영상 출력 => extraVideo를 true로 설정 */}
      {extraVideo && <YouTube videoId={videoId} />}
    </div>
  );
}

export default YoutubeInfo;
