import { ChartColumnStacked } from "lucide-react";
import api from "./api";

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await api.post("/resume/upload", formData);

  return response.data;
};

export const fetchResume = async () => {
  const response = await api.get("/resume/get-all-resume");
  return response.data;
};

export const analyseResume = async (resumeId) => {
    const response = await api.post(`/resume/analysis/${resumeId}`);
    return response.data;
};

export const fetchResumeAnalysis = async (resumeId) => {
    const response = await api.get(`/resume/analysis/${resumeId}`);
    return response.data;
};

export const deleteResume =  async (resumeId) => {
    const response = await api.delete(`/resume/delete-resume/${resumeId}`)
    return response.data;
};
