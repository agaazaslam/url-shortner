import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer, Slide } from "react-toastify";
import "./index.css";

import { RouterProvider } from "react-router/dom";
import router from "./routes/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer transition={Slide} />
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
