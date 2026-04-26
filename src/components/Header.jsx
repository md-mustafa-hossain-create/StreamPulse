import { useState } from "react";
import logo from "../assets/logo.svg";
import { User, Menu, X } from "lucide-react";

const Header = ({ showNav = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="flex justify-between items-center px-6 md:px-12 lg:px-20 py-4 text-white relative z-50  ">
      <img src={logo} alt="Logo" />

      <div className="flex items-center gap-5">
        {showNav && (
          <nav>
            <ul className=" hidden lg:flex  items-center h-full gap-8 font-medium  ">
              <li className="cursor-pointer">Home</li>
              <li className="cursor-pointer">Tv Shows</li>
              <li className="cursor-pointer">Movies</li>
              <li className="cursor-pointer">New & Popular</li>
            </ul>
          </nav>
        )}

        <button
          className={`bg-brand-red  px-4 py-2 rounded-lg font-bold text-sm hover:bg-brand-red-dark transition duration-300 cursor-pointer  items-center gap-1 ${showNav ? "hidden lg:flex" : "flex"}`}
        >
          <User />
          {showNav ? "Log out" : "Sign in"}
        </button>

        {/*Mobile Hamberger*/}
        {showNav && (
          <button className="cursor-pointer lg:hidden" onClick={handleToggle}>
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

      {/* Mobile Menu Overlay */}
      {isOpen && showNav && (
        <div className="absolute top-full left-0 w-full bg-brand-black/95 backdrop-blur-xl border-b border-white/10 lg:hidden transition-all animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="p-8">
            <ul className="flex flex-col gap-6 font-medium text-xl">
              <li className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
                  <User size={24} />
                </div>
                <span className="font-bold">My Profile</span>
              </li>

              <li className="hover:text-brand-red transition cursor-pointer">
                Home
              </li>
              <li className="hover:text-brand-red transition cursor-pointer">
                Tv Shows
              </li>
              <li className="hover:text-brand-red transition cursor-pointer">
                Movies
              </li>
              <li className="hover:text-brand-red transition cursor-pointer">
                New & Popular
              </li>

              <hr className="border-white/10" />
              <li>
                <button className=" bg-brand-red px-4 py-2 rounded-lg font-bold cursor-pointer w-full ">
                  Log out
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
