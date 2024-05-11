import { createBrowserRouter } from "react-router-dom";
import Landing from "./components/landing/landing";
import SignUp from "./components/signup/signup";
import Login from "./components/login/login";
import Home from "./components/home/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);
