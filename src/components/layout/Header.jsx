import { useState } from "react";
import logo from "../../assets/logo.svg";
import { User, Menu, X } from "lucide-react";
import { Button } from "../ui";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useSelector } from "react-redux";
import { APP_NAME, NAV_ITEMS } from "../../constants/app";
import { ROUTES } from "../../constants/routes";

const Header = ({ variant = "main" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((store) => store.user);

  // determining navigation visibility and layout based on the header's display context
  const showNav = variant === "main";
  const isLogoOnly = variant === "auth";

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // NOTE: firebase session termination confirmed; routing is handled by the parent Body component listener
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <header className="flex justify-between items-center px-6 md:px-12 lg:px-20 py-4 text-white absolute top-0 left-0 w-full z-100 bg-linear-to-b from-black/90 to-transparent">
      {/* branding element with responsive sizing and transition effects */}
      <img
        src={logo}
        alt={`${APP_NAME} Logo`}
        className="w-56 md:w-64 lg:w-72 h-auto object-contain transition-all duration-300"
      />

      {/* rendering conditional navigation links and user account controls */}
      {!isLogoOnly && (
        <>
          <div className="flex items-center gap-5">
            {showNav && (
              <nav>
                <ul className=" hidden lg:flex items-center h-full gap-5 font-medium text-lg ">
                  {NAV_ITEMS.map((item, index) => (
                    <li key={index}>
                      <NavLink
                        to={ROUTES.BROWSE}
                        className="cursor-pointer text-white font-medium hover:text-white/70 transition-colors duration-300"
                      >
                        {item}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {showNav && (
              <div className="lg:flex items-center gap-3 group relative hidden cursor-pointer">
                <Button
                  variants="avatar"
                  className="group-hover:bg-brand-red-dark transition-colors duration-300"
                >
                  <User />
                </Button>

                <div className="text-sm font-semibold max-w-[100px] truncate cursor-pointer group-hover:text-white/70 transition-colors duration-300">
                  {user?.displayName}
                </div>

                {/* NOTE: using a transparent 'before' bridge to maintain hover state when moving cursor to the dropdown */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-brand-black/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl hidden group-hover:block transition-all animate-in fade-in slide-in-from-top-2 duration-300 before:absolute before:-top-4 before:left-0 before:w-full before:h-4 before:content-['']">
                  <nav className="p-4">
                    <ul className="flex flex-col gap-4">
                      <li className="text-sm font-medium hover:text-brand-red cursor-pointer transition">
                        My Profile
                      </li>
                      <li className="text-sm font-medium hover:text-brand-red cursor-pointer transition">
                        Account Settings
                      </li>
                      <hr className="border-white/10" />
                      <li>
                        <Button
                          variants="ghost"
                          className="w-full justify-start! p-0"
                          onClick={handleLogout}
                        >
                          Log Out
                        </Button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}

            {showNav && (
              <button
                className="cursor-pointer lg:hidden"
                onClick={handleToggle}
              >
                {isOpen ? (
                  <X
                    size={28}
                    className="rotate-0 hover:rotate-90 transition-transform duration-300"
                  />
                ) : (
                  <Menu
                    size={28}
                    className="hover:scale-110 transition-transform duration-300"
                  />
                )}
              </button>
            )}
          </div>

          {isOpen && showNav && (
            <div className="absolute top-full left-0 w-full bg-brand-black/95 backdrop-blur-xl border-b border-white/10 lg:hidden transition-all animate-in fade-in slide-in-from-top-4 duration-300">
              <nav className="p-8">
                <ul className="flex flex-col gap-6 font-medium text-xl">
                  <li className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 bg-brand-red rounded flex items-center justify-center overflow-hidden">
                      <User />
                    </div>
                    <span className="font-bold">My Profile</span>
                  </li>
                  {NAV_ITEMS.map((item, index) => (
                    <li
                      className="active:text-brand-red transition cursor-pointer"
                      key={index}
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </li>
                  ))}
                  <hr className="border-white/10" />
                  <li>
                    <Button
                      variants="primary"
                      className="w-full "
                      onClick={handleLogout}
                    >
                      Log Out
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
