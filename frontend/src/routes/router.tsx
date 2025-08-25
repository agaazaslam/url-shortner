import { createBrowserRouter } from "react-router";
import ShortenPage from "../pages/ShortenPage.tsx";
import HomePage from "../pages/HomePage.tsx";
import AboutPage from "../pages/AboutPage.tsx";
import AllUrlPage from "../pages/AllUrlPage.tsx";
import SignUpPage from "../pages/SignUpPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/home",
    Component: HomePage,
    element: <HomePage />,
  },
  {
    path: "/shorten",
    element: <ShortenPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/allurl",
    element: <AllUrlPage />,
  },

  {
    path: "/auth",
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
]);

export default router;
