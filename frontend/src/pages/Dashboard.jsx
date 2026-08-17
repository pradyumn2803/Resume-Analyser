import React from 'react'
import {removeAccessToken} from "../utils/auth"
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const navigate = useNavigate();
  function handleLogout() {
    removeAccessToken();
    navigate("/login");
  }
  return (
    <button onClick={handleLogout}>logout</button>
  )
}

export default Dashboard