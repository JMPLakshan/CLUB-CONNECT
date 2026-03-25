import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-700 shadow-lg backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white shadow-md ring-1 ring-white/20">
            <GraduationCap size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide text-white md:text-2xl">
              Campus Society
            </h1>
            <p className="text-xs text-blue-100">Connect. Learn. Grow.</p>
          </div>
        </Link>

        {/* Nav Links */}
        <ul className="hidden items-center gap-2 md:flex">
          <li>
            <Link
              to="/"
              className="rounded-lg px-4 py-2 text-sm font-medium text-blue-100 transition hover:bg-white/10 hover:text-white"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/home"
              className="rounded-lg px-4 py-2 text-sm font-medium text-blue-100 transition hover:bg-white/10 hover:text-white"
            >
              Clubs
            </Link>
          </li>
          <li>
            <Link
              to="/user-dashboard"
              className="rounded-lg px-4 py-2 text-sm font-medium text-blue-100 transition hover:bg-white/10 hover:text-white"
            >
              Student
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-indigo-800 shadow-md transition hover:scale-105 hover:bg-blue-50"
            >
              Register
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-indigo-800"
            >
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="rounded-lg border border-white/20 p-2 text-white md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;