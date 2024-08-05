import { createBrowserRouter } from "react-router-dom";
import SignUp from "./components/auth/signup";
import Login from "./components/auth/login";
import Home from "./components/home/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);
