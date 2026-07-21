import api from "./api";

const credentials = {
    email,
    password
}

export const login = async(credentials)=>{
    const response = await api.post("/auth/login",credentials)
    return response.data
};

export const register = async(userData)=>{
    const response = await api.post("/auth/register", userData);
    return response.data
};


