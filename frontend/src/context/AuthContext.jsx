import { createContext,useState,useContext } from "react";
import { getAccessToken } from "../utils/auth";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!getAccessToken());
    return(
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;