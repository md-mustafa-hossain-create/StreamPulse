import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";
import { ROUTES } from "../../constants/routes";
import { addUser, removeUser } from "../../features/auth/userSlice";
import Header from "./Header";

const AppLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));

        if (location.pathname === ROUTES.HOME) {
          navigate(ROUTES.BROWSE);
        }
      } else {
        dispatch(removeUser());
        navigate(ROUTES.HOME);
      }
    });

    return () => unsubscribe();
  }, [dispatch, location.pathname, navigate]);

  const headerVariant = location.pathname === ROUTES.HOME ? "auth" : "main";

  return (
    <div className="selection:bg-brand-red selection:text-white">
      <Header variant={headerVariant} />
      <Outlet />
    </div>
  );
};

export default AppLayout;
