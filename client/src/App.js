import React from 'react'
import Navbar from './Components/Navbar'
import Message from './Components/Message'
import Hall from './Components/Hall';
import RegisterUser from './Components/RegisterUser';
import LoginUser from './Components/LoginUser';
import LogoutUser from './Components/LogoutUser';
import RegisterForEvent from './Components/RegisterForEvent';
import AdminDashboard from './Components/AdminDashboard';
import { useUserGlobalContext } from './Context/UserContext';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import './App.css';

function App() {
  const { alert, error } = useUserGlobalContext()

  return (
    <Router>
      <Navbar />
      { alert && <Message alert={alert} error={error} /> }
      <Routes>
        <Route path='/' caseSensitive={true} element={<Hall />} />
        <Route path='/register-user' caseSensitive={true} element={<RegisterUser />} />
        <Route path='/login-user' caseSensitive={true} element={<LoginUser />} />
        <Route path='/logout-user' caseSensitive={true} element={<LogoutUser />} />
        <Route path='/create-reservation' caseSensitive={true} element={<RegisterForEvent />} />
        <Route path='/admin-dashboard' caseSensitive={true} element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;



