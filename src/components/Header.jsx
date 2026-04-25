import logo from "../assets/logo.svg";
import { User } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-20 py-4 text-white">
      <img src={logo} alt="Logo" />

      <div className="flex items-center gap-5">
        <nav>
          <ul className="flex items-center h-full gap-8 font-medium">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Tv Shows</li>
            <li className="cursor-pointer">Movies</li>
            <li className="cursor-pointer">New & Popular</li>
          </ul>
        </nav>
        <button className="bg-brand-red text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-brand-red-dark transition duration-300 cursor-pointer flex items-center gap-1">
          <User />
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
