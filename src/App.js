import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomeLayout } from "./layout/Homelayout";
import MemberSignup from "./member/MemberSignup";
import MemberLogin from "./member/MemberLogin";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      {/*<Route path="경로명" element={컴포넌트} />*/}
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
