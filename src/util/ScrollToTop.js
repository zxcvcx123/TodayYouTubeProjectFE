import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop(props) {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("스크롤 상단으로");
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{props.children}</>;
}
