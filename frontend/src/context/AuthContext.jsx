import { createContext,useState,useContext } from "react";
import {useNavigate} from "react-router-dom";
import { getAccessToken, removeAccessToken } from "../utils/auth";
import { login } from "../services/authService";
export const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!getAccessToken());
    const navigate = useNavigate();
    const logout = () => {
        removeAccessToken();
        setIsAuthenticated(false);
        navigate("/login");
    }
    const loginUser = async(credentials) =>{
        await login(credentials);
        setIsAuthenticated(true);
        navigate("/dashboard");
    }
    return(
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout, loginUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;