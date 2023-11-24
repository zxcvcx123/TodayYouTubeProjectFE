import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomeLayout } from "./layout/Homelayout";
import BoardWrite from "./board/BoardWrite";
import BoardView from "./board/BoardView";
import BoardList from "./board/BoardList";
import BoardEdit from "./board/BoardEdit";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      {/*<Route path="경로명" element={컴포넌트} />*/}
      <Route path="write" element={<BoardWrite />} />
      <Route path="board/:id" element={<BoardView />} />
      <Route path="board/list" element={<BoardList />} />
      <Route path="board/edit/:id" element={<BoardEdit />} />
    </Route>,
  ),
);

function App() {
  // 건들지 마시오
  return <RouterProvider router={routes} />;
}

export default App;
