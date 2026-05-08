import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/Login";
import Browse from "../pages/Browse";
import Body from "../components/Body";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
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
