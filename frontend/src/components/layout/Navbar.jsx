import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#0B1020]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-linear-to-r from-violet-500 to-indigo-400 bg-clip-text text-transparent"
        >
          ResuIQ
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          <a
            href="#features"
            className="text-gray-300 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#pricing"
            className="text-gray-300 transition hover:text-white"
          >
            Pricing
          </a>

          <Link
            to="/login"
            className="text-gray-300 transition hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-5 py-3 font-semibold transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/30"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
