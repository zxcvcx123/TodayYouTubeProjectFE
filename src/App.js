import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomeLayout } from "./layout/Homelayout";
import { BoardWrite } from "./board/BoardWrite";
import { BoardView } from "./board/BoardView";
import { Filednd } from "./file/Filednd";
import MemberSignup from "./member/MemberSignup";
import MemberLogin from "./member/MemberLogin";
import { MainView } from "./layout/MainView";
import { MainBoardList } from "./layout/MainBoardList";


const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<MainView />} />
      <Route index element={<MainBoardList />} />
      {/*<Route path="경로명" element={컴포넌트} />*/}
      <Route path="/board/write" element={<BoardWrite />} />
      <Route path="/board/:id" element={<BoardView />} />
      <Route path="/file/" element={<Filednd />} />
      <Route path={"member/signup"} element={<MemberSignup />} />
      <Route path={"member/login"} element={<MemberLogin />} />

    </Route>,
  ),
);

function App() {
  // 건들지 마시오
  return <RouterProvider router={routes} />;
}

export default App;
