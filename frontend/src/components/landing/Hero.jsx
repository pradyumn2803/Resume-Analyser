import { ArrowRight, Upload, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row">
      {/* Left Side */}
      <div className="max-w-2xl">
        <div className="mb-6 inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
          🚀 AI Powered Resume Analysis
        </div>

        <h1 className="text-5xl font-extrabold leading-tight lg:text-7xl">
          Land More Interviews with
          <span className="block bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            AI Resume Analysis
          </span>
        </h1>

        <p className="mt-8 text-lg leading-8 text-gray-400">
          Analyse your resume using Artificial Intelligence, improve your ATS
          score, discover missing keywords, and receive personalised suggestions
          to stand out from recruiters.
        </p>

        <div className="mt-10 flex flex-wrap gap-5">
          <Link
            to="/register"
            className="flex items-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-6 py-4 font-semibold transition hover:scale-105 hover:shadow-xl hover:shadow-violet-500/30"
          >
            <Upload size={20} />
            Upload Resume
          </Link>

          <a
            href="#features"
            className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-4 transition hover:bg-white/5"
          >
            Learn More
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="mt-12 flex flex-wrap gap-8">
          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle2 className="text-green-400" size={18} />
            ATS Optimisation
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle2 className="text-green-400" size={18} />
            AI Suggestions
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <CheckCircle2 className="text-green-400" size={18} />
            Keyword Matching
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative w-full max-w-md">
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-violet-600/30 blur-3xl"></div>

        <div className="absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-indigo-600/30 blur-3xl"></div>

        <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <h3 className="mb-8 text-xl font-semibold">Resume Analysis</h3>

          <div className="space-y-6">
            <div>
              <div className="mb-2 flex justify-between">
                <span>ATS Score</span>
                <span className="font-bold text-green-400">92%</span>
              </div>

              <div className="h-3 rounded-full bg-gray-700">
                <div className="h-3 w-[92%] rounded-full bg-green-400"></div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <span>Skills Match</span>
                <span className="font-bold text-violet-400">87%</span>
              </div>

              <div className="h-3 rounded-full bg-gray-700">
                <div className="h-3 w-[87%] rounded-full bg-violet-500"></div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <span>Keyword Coverage</span>
                <span className="font-bold text-indigo-400">81%</span>
              </div>

              <div className="h-3 rounded-full bg-gray-700">
                <div className="h-3 w-[81%] rounded-full bg-indigo-500"></div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-green-500/10 p-4 text-green-300">
            ✓ 14 AI recommendations available
          </div>
        </div>
      </div>
    </section>
  );
}
