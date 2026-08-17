import { BrowserRouter,Routes,Route } from "react-router-dom"
import Landing from "../pages/Landing"
import Analysis from "../pages/Analysis"
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register"
import ProtectedRoute from "../components/auth/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
            <Route path="/analysis/:id" element={<ProtectedRoute><Analysis/></ProtectedRoute>} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes