import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090E1B]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <h2 className="bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-3xl font-bold text-transparent">
            ResuIQ
          </h2>

          <p className="mt-5 leading-7 text-gray-400">
            AI-powered resume analysis designed to improve your ATS score and
            help you stand out to recruiters.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Quick Links</h3>

          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
          </ul>
        </div>

        {/* Product */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Product</h3>

          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">Contact</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-400">
              <FaGithub size={18} />
              GitHub
            </div>

            <div className="flex items-center gap-3 text-gray-400">
              <FaLinkedin size={18} />
              LinkedIn
            </div>

            <div className="flex items-center gap-3 text-gray-400">
              <FaEnvelope className="shrink-0 flex-none" size={18} />
              pradyumnchoudhary123@gmail.com
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
        © 2026 ResuIQ. All rights reserved.
      </div>
    </footer>
  );
}
