import { useEffect } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../store/slices/userSlice";
import Header from "./layout/Header";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in or signed up
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));

        navigate("/browse");
      } else {
        // User is logged out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch, navigate]);

  // If we are on the home page ("/"), show "auth" header. Otherwise, show "main".
  const headerVariant = location.pathname === "/" ? "auth" : "main";

  return (
    <div>
      <Header variant={headerVariant} />
      <Outlet />
    </div>
  );
};

export default Body;
