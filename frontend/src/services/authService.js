import api from "./api";

export const login = async(credentials)=>{
    const response = await api.post("/auth/login",credentials)
    localStorage.setItem("access_token", response.data.access_token);
    return response.data
};

export const register = async(userData)=>{
    const response = await api.post("/auth/register", userData);
    return response.data
};


