import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 p-12 backdrop-blur-xl">
        {/* Background Glow */}
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"></div>

        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-bold lg:text-5xl">
            Ready to Build a Resume That Gets Interviews?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300">
            Upload your resume, receive AI-powered feedback, improve your ATS
            score, and maximise your chances of landing your dream job.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Link
              to="/register"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 font-semibold transition hover:scale-105 hover:shadow-xl hover:shadow-violet-500/30"
            >
              Get Started
              <ArrowRight size={20} />
            </Link>

            <button className="rounded-xl border border-white/20 px-8 py-4 transition hover:bg-white/10">
              View Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
