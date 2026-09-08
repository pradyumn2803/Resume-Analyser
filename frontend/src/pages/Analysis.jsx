import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchResumeAnalysis } from "../services/resumeService";

function Analysis() {
  const { id } = useParams();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let interval;

    const loadAnalysis = async () => {
      try {
        const data = await fetchResumeAnalysis(id);
        console.log("Analysis API response:", data.analysis[0]);
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
        <h1 className="text-3xl font-bold">Resume Analysis</h1>

        {/* ATS Score */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-xl font-semibold">ATS Score</h2>

          <p className="mt-4 text-5xl font-bold text-violet-400">
            {analysis?.ats_score ?? "N/A"}
          </p>
        </div>

        {/* Summary */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-xl font-semibold">Summary</h2>

          <p className="mt-3 text-gray-400">
            {analysis?.llm_response?.summary}
          </p>
        </div>

        {/* Strengths */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-xl font-semibold">Strengths</h2>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-400">
            {analysis?.llm_response?.strengths?.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-xl font-semibold">Weaknesses</h2>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-400">
            {analysis?.llm_response?.weaknesses?.map((weakness, index) => (
              <li key={index}>{weakness}</li>
            ))}
          </ul>
        </div>

        {/* Missing Skills */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-xl font-semibold">Missing Skills</h2>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-400">
            {analysis?.llm_response?.missing_skills?.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        {/* Suggestions */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-xl font-semibold">Suggestions</h2>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-400">
            {analysis?.suggestions?.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
