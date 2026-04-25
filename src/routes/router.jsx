import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Browse from "../pages/Browse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
]);

export default router;
