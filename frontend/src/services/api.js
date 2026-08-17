import axios from "axios"
import config  from "../config/config";
import { getAccessToken } from "../utils/auth";
const api = axios.create({
    baseURL: config.apiBaseUrl,
    headers:{
        "Content-Type":"application/json",
    },
});

api.interceptors.request.use((config)=>{
    const token = getAccessToken();
    if(token){ 
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;