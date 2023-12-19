import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import React from "react";
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
import MemberInfo from "./member/memberInfo/MemberInfo";
import InquiryEdit from "./inquiry/InquiryEdit";
import AdminMain from "./admin/AdminMain";
import InquiryAnswer from "./inquiry/InquiryAnswer";
import SearchResult from "./allsearch/SearchResult";
import VoteWrite from "./vote/VoteWrite";
import VoteView from "./vote/VoteView";
import MiniHomepyContainer from "./member/minihomepy/MiniHomepyContainer";
import MiniHomepy from "./member/minihomepy/MiniHomepy";
import AdminMemberList from "./admin/AdminMemberList";
import VoteList from "./vote/VoteList";
import AdminMemberInfo from "./admin/AdminMemberInfo";
import VoteLoading from "./vote/VoteLoading";

import "./index.css";

import AdminManageSuspension from "./admin/AdminManageSuspension";
import SuspensionMemberLoginPage from "./admin/SuspensionMemberLoginPage";
import { AdminReportManagement } from "./admin/AdminReportManagement";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<MainView />} />
        <Route index element={<MainBoardList />} />
        {/*<Route path="경로명" element={컴포넌트} />*/}
        <Route path="board/write" element={<BoardWrite />} />
        <Route path="board/:id" element={<BoardView />} />
        <Route path="board/list" element={<BoardList />} />
        <Route path="board/edit/:id" element={<BoardEdit />} />
        <Route path="board/vote/write" element={<VoteWrite />} />
        <Route path="board/vote/:id" element={<VoteView />} />
        <Route
          path="board/vote/list"
          element={
            <VoteLoading>
              <VoteList />
            </VoteLoading>
          }
        />
        <Route path="inquiry/list" element={<InquiryList />} />
        <Route path="inquiry/write" element={<InquiryWrite />} />
        <Route path="inquiry/:id" element={<InquiryView />} />
        <Route path="inquiry/edit/:id" element={<InquiryEdit />} />
        <Route path="inquiry/answer/:id" element={<InquiryAnswer />} />
        <Route path="/file/" element={<Filednd />} />
        <Route path="member/signup" element={<MemberSignup />} />
        <Route path="member/login" element={<MemberLogin />} />
        <Route path="member/info" element={<MemberInfo />} />
        <Route path="editor" element={<Editor />} />
        <Route path="chat" element={<Chat />} />
        <Route path="admin" element={<AdminMain />} />
        <Route path="admin/member/list" element={<AdminMemberList />} />
        <Route path="admin/suspension" element={<AdminManageSuspension />} />
        <Route path="admin/report" element={<AdminReportManagement />} />
        <Route path="/:member_id" element={<SuspensionMemberLoginPage />} />
        <Route path="admin/member/:member_id" element={<AdminMemberInfo />} />
        <Route path="search" element={<SearchResult />} />
        <Route path="/member/minihomepy" element={<MiniHomepyContainer />}>
          <Route
            path="/member/minihomepy/:member_id"
            element={<MiniHomepy />}
          />
        </Route>
      </Route>
    </>,
  ),
);

function App() {
  // 건들지 마시오
  return <RouterProvider router={routes} />;
}

export default App;
