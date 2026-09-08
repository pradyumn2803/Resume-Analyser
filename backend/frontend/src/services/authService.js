import api from "./api";
import { setAccessToken } from "../utils/auth";
export const login = async(credentials)=>{
    const response = await api.post("/auth/login",credentials)
    setAccessToken(response.data.access_token);
    return response.data
};

export const register = async(userData)=>{
    const response = await api.post("/auth/register", userData);
    return response.data
};


