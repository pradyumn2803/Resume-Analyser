import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
function Dashboard() {
  const { logout, loginUser } = useContext(AuthContext);
  return (
    <button onClick={logout}>logout</button>
  )
}

export default Dashboard