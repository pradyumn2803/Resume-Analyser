import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import ResumeUpload from "../components/resume/ResumeUpload";
import { useState, useEffect } from "react";
import { fetchResume, analyseResume } from "../services/resumeService";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { logout } = useContext(AuthContext);

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadResumes = async () => {
    try {
      const data = await fetchResume();
      setResumes(data.resume);
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

                  <button
                    onClick={() => handleAnalysis(resume.id)}
                    className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium hover:bg-violet-500"
                  >
                    Analyze
                  </button>
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
