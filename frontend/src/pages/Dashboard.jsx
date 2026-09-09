import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import ResumeUpload from "../components/resume/ResumeUpload";
import { useState, useEffect } from "react";
import {
  fetchResume,
  analyseResume,
  deleteResume,
} from "../services/resumeService";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { logout } = useContext(AuthContext);

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadResumes = async () => {
    try {
      console.log("Fetching resumes...");
      const data = await fetchResume();
      setResumes(
        [...data.resume].sort(
          (a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at),
        ),
      );
    } catch (error) {
      console.error("Failed to load Resume", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalysis = async (resumeId) => {
    try {
      const response = await analyseResume(resumeId);
      navigate(`/analysis/${resumeId}`);
    } catch (error) {
      console.error("Failed to Analyse", error);
    }
  };

  const handleDelete = async (resumeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?",
    );

    if (!confirmed) return;

    try {
      await deleteResume(resumeId);

      setResumes((prevResumes) =>
        prevResumes.filter((resume) => resume.id !== resumeId),
      );
    } catch (error) {
      console.error("Failed to delete resume:", error);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1020] p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">ResuIQ</h1>
            <p className="mt-2 text-gray-400">
              Analyze your resume and improve your chances of getting hired.
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-xl border border-white/10 px-5 py-2 hover:bg-white/5"
          >
            Logout
          </button>
        </div>

        <ResumeUpload onUploadSuccess={loadResumes} />
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Your Resumes</h2>

          {loading ? (
            <p className="text-gray-400">Loading resumes...</p>
          ) : resumes.length === 0 ? (
            <p className="text-gray-400">No resumes uploaded yet.</p>
          ) : (
            <div className="space-y-3">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div>
                    <p className="font-medium">{resume.name}</p>
                    <p className="text-sm text-gray-400">
                      {(resume.file_size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAnalysis(resume.id)}
                      className="rounded-xl bg-violet-600 px-4 py-2 font-semibold hover:bg-violet-500"
                    >
                      Analyze
                    </button>

                    <button
                      onClick={() => handleDelete(resume.id)}
                      className="rounded-xl border border-red-500/30 px-4 py-2 text-red-400 hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
