import { BrowserRouter,Routes,Route } from "react-router-dom"
import Landing from "../pages/Landing"
import Analysis from "../pages/Analysis"
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register"

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/analysis/:id" element={<Analysis/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes