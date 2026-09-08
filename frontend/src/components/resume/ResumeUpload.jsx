import { useState } from "react";
import { Upload, FileText } from "lucide-react";
import { uploadResume } from "../../services/resumeService";


export default function ResumeUpload({onUploadSuccess}) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    try {
      setUploading(true);
      setUploadError(null);
      const result = await uploadResume(file);
      console.log(result);
      onUploadSuccess();
    } catch (error) {
      setUploadError(
        error.response?.data?.message ||
          "An error occurred while uploading the resume.",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Analyze Your Resume</h2>
        <p className="mt-2 text-sm text-gray-400">
          Upload your resume and let AI analyze your ATS score.
        </p>
      </div>

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/10 p-10 transition hover:border-violet-500">
        <Upload className="mb-4 text-violet-400" size={36} />

        <p className="font-medium">Click to upload your resume</p>

        <p className="mt-2 text-sm text-gray-400">PDF or DOCX</p>

        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {file && (
        <>
          <div className="mt-5 flex items-center gap-3 rounded-xl bg-white/5 p-4">
            <FileText className="text-violet-400" size={24} />

            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-5 w-full rounded-xl bg-violet-600 py-3 font-semibold hover:bg-violet-500 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </>
      )}

      {uploadError && (
        <p className="mt-3 text-sm text-red-400">{uploadError}</p>
      )}
    </div>
  );
}
