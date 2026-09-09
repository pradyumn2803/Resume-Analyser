import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchResumeAnalysis } from "../services/resumeService";
import { useNavigate } from "react-router-dom";
function Analysis() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let interval;

    const loadAnalysis = async () => {
      try {
        const data = await fetchResumeAnalysis(id);
        console.log("Analysis API response:", data.analysis[0]);
        if (data.analysis[0]?.status === "PROCESSING") {
          setLoading(true);
          return;
        }

        if (data.analysis?.length > 0) {
          setAnalysis(data.analysis[0]);
          setLoading(false);
          clearInterval(interval);
        }
      } catch (error) {
        // Analysis may not be ready yet
        console.log("Analysis not ready yet");
      }
    };

    loadAnalysis();

    interval = setInterval(loadAnalysis, 3000);

    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B1020] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Analyzing your resume...</h1>
          <p className="mt-2 text-gray-400">
            AI is reviewing your resume. This may take a moment.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B1020] p-8 text-red-400">{error}</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1020] p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Resume Analysis</h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl border border-white/10 px-5 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
          >
            Back to Dashboard
          </button>
        </div>

        {/* ATS Score */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">ATS SCORE</p>

              <p className="mt-2 text-6xl font-bold text-violet-400">
                {analysis?.ats_score ?? "N/A"}
              </p>

              <p className="mt-2 text-sm text-gray-500">out of 100</p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-400">Analysis Status</p>

              <span className="mt-2 inline-block rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
                {analysis?.status}
              </span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-xl font-semibold">Summary</h2>

          <p className="mt-3 text-gray-400">
            {analysis?.llm_response?.summary}
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Strengths */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-xl font-semibold">Strengths</h2>

            <ul className="mt-5 space-y-3">
              {analysis?.llm_response?.strengths?.map((strength, index) => (
                <li
                  key={index}
                  className="rounded-xl bg-green-500/5 p-4 text-sm text-gray-300"
                >
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-xl font-semibold">Weaknesses</h2>

            <ul className="mt-5 space-y-3">
              {analysis?.llm_response?.weaknesses?.map((weakness, index) => (
                <li
                  key={index}
                  className="rounded-xl bg-red-500/5 p-4 text-sm text-gray-300"
                >
                  {weakness}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-xl font-semibold">Missing Skills</h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {analysis?.llm_response?.missing_skills?.map((skill, index) => (
              <span
                key={index}
                className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-xl font-semibold">Suggestions</h2>

          <div className="mt-5 space-y-4">
            {analysis?.suggestions?.map((suggestion, index) => (
              <div key={index} className="flex gap-4 rounded-xl bg-white/5 p-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-sm font-semibold text-violet-400">
                  {index + 1}
                </div>

                <p className="text-sm leading-6 text-gray-300">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
