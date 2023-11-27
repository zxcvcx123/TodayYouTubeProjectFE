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

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      {/*<Route path="경로명" element={컴포넌트} />*/}
      <Route path="/board/write" element={<BoardWrite />} />
      <Route path="/board/:id" element={<BoardView />} />
      <Route path="/file/" element={<Filednd />} />
    </Route>,
  ),
);

function App() {
  // 건들지 마시오
  return <RouterProvider router={routes} />;
}

export default App;
