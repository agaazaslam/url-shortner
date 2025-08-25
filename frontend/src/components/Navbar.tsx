import { Link2 } from "lucide-react";
import { Menu } from "lucide-react";
import { Link } from "react-router";
const Navbar = () => {
  return (
    <header className="flex p-5 bg-slate-100 justify-between">
      <div className="flex items-center gap-1">
        <Link2 className="h-10 w-10 text-black " />
        <h1 className="text-2xl font-bold">Urlen </h1>
      </div>
      <div className="flex items-center gap-3">
        <Link className=" font-bold text-l" to="/home">
          Home
        </Link>
        <Link className=" font-bold text-l" to="/shorten">
          Shorten
        </Link>
        <Link className=" font-bold text-l" to="/allurl">
          All URL
        </Link>
        <Link className=" font-bold text-l" to="/about">
          About
        </Link>
      </div>
      <div className="flex gap-3 items-center ">
        <Link to="/auth/signup">Signup </Link>
        <Link to="/auth/login">Login </Link>
        <button>
          <Menu className="h-8 w-8" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
