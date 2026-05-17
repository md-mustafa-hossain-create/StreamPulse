import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Browse from "../pages/Browse";
import AppLayout from "../components/layout/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
    ],
  },
]);

export default router;
