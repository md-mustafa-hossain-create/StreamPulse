import { useEffect } from "react";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../../store/slices/userSlice";
import Header from "./Header";
import { ROUTES } from "../../utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // syncing global state with authenticated user session
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));

        // only redirect to browse if the user is currently on the landing/login page
        if (location.pathname === ROUTES.HOME) {
          navigate(ROUTES.BROWSE);
        }
      } else {
        // clearing user session from global state upon sign-out
        dispatch(removeUser());
        navigate(ROUTES.HOME);
      }
    });

    // terminating firebase auth listener to prevent memory leaks during component unmount
    return () => unsubscribe();
  }, [dispatch, navigate, location.pathname]);

  // NOTE: determining header styling based on the current navigation route
  const headerVariant = location.pathname === ROUTES.HOME ? "auth" : "main";

  return (
    <div className="selection:bg-brand-red selection:text-white">
      <Header variant={headerVariant} />
      <Outlet />
    </div>
  );
};

export default Body;
