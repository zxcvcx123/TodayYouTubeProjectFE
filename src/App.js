import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Router,
  RouterProvider,
} from "react-router-dom";
import { HomeLayout } from "./layout/Homelayout";

import BoardWrite from "./board/BoardWrite";
import BoardView from "./board/BoardView";
import BoardList from "./board/BoardList";
import BoardEdit from "./board/BoardEdit";
import { Filednd } from "./file/Filednd";
import MemberSignup from "./member/MemberSignup";
import MemberLogin from "./member/MemberLogin";
import { MainView } from "./layout/MainView";
import { MainBoardList } from "./layout/MainBoardList";
import Editor from "./component/Editor";
import Chat from "./socket/Chat";
import InquiryList from "./inquiry/InquiryList";
import InquiryView from "./inquiry/InquiryView";
import InquiryWrite from "./inquiry/InquiryWrite";
import LoginProvider from "./component/LoginProvider";
import MemberInfo from "./member/memberInfo/MemberInfo";
import InquiryEdit from "./inquiry/InquiryEdit";
import AdminMain from "./admin/AdminMain";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<MainView />} />
      <Route index element={<MainBoardList />} />
      {/*<Route path="경로명" element={컴포넌트} />*/}
      <Route path="write" element={<BoardWrite />} />
      <Route path="board/:id" element={<BoardView />} />
      <Route path="board/list" element={<BoardList />} />
      <Route path="board/edit/:id" element={<BoardEdit />} />
      <Route path="inquiry/list" element={<InquiryList />} />
      <Route path="inquiry/write" element={<InquiryWrite />} />
      <Route path="inquiry/:id" element={<InquiryView />} />
      <Route path="inquiry/edit/:id" element={<InquiryEdit />} />
      <Route path="/file/" element={<Filednd />} />
      <Route path={"member/signup"} element={<MemberSignup />} />
      <Route path={"member/login"} element={<MemberLogin />} />
      <Route path={"member/info"} element={<MemberInfo />} />
      <Route path={"editor"} element={<Editor />} />
      <Route path="chat" element={<Chat />} />
      <Route path="admin/*" element={<AdminMain />} />
    </Route>,
  ),
);

function App() {
  // 건들지 마시오
  return <RouterProvider router={routes} />;
}

export default App;
