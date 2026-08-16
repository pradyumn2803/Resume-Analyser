import axios from "axios"
import config  from "../config/config";

const api = axios.create({
    baseURL: config.apiBaseUrl,
    headers:{
        "Content-Type":"application/json",
    },
});

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("access_token");
    if(token){ 
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;