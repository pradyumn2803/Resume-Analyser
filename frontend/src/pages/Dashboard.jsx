import React from 'react'
import {removeAccessToken} from "../utils/auth"
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  function handleLogout() {
    removeAccessToken();
    setIsAuthenticated(false);
    navigate("/login");
  }
  return (
    <button onClick={handleLogout}>logout</button>
  )
}

export default Dashboard