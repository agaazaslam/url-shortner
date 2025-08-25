import { createBrowserRouter } from "react-router";
import ShortenPage from "../pages/ShortenPage.tsx";
import HomePage from "../pages/HomePage.tsx";
import AboutPage from "../pages/AboutPage.tsx";
import AllUrlPage from "../pages/AllUrlPage.tsx";
import App from "../App.tsx";
import SignUpPage from "../pages/SignUpPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/home",
    Component: HomePage,
  },
  {
    path: "/shorten",
    Component: ShortenPage,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
  {
    path: "/allurl",
    Component: AllUrlPage,
  },

  {
    path: "/auth",
    children: [
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignUpPage },
    ],
  },
]);

export default router;
