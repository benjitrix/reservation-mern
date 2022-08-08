import React from 'react'
import Seat from './Components/Seat';
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom'
import './App.css';

function App() {
  const [user, setUser] = React.useState(null)

  const handleLogin = () => setUser({id: '1', name: 'robin'})
  const handleLogout = () => setUser(null)

  return (
    <>
      <h1>React Router</h1>

      <Navigation />

      {
        user ? (
          <button onClick={handleLogout}>Sign Out</button>
        ) : (
          <button onClick={handleLogin}>Sing In</button>
        )
      }
      <Routes>
        <Route index element={<Landing />} />
        <Route path="Landing" element={<Landing />} />
        {/* <Route 
          path="home" 
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="dashboard" 
          element={
            <ProtectedRoute user={user}>
              <DashBoard />
            </ProtectedRoute>
          } 
        /> */}
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="home" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="analytics" element={<Analytics />} />
        <Route path="Admin" element={<Admin />} />
        <Route path="*" element={<p>There's nothing here: 404</p>} />
      </Routes>
    </>
  );
}

export default App;

const Navigation = () => (
  <nav>
    <Link to='/landing'>Landing</Link>
    <Link to='/home'>Home</Link>
    <Link to='/dashboard'>Dashboard</Link>
    <Link to='/analytics'>Analytics</Link>
    <Link to='/admin'>Admin</Link>
  </nav>
)

const Landing = () => {
  return <h2>Landing (Public: anyone can access this page)</h2>
}

const Home = ({user})  => {
  if (!user) {
    return <Navigate to="/landing" replace />
  }
  return (
    <h2>Home (Protected: authenticated user required)</h2>
  )
}

const Dashboard = () => {
  return <h2>Dashboard (Protected: authenticated user required)</h2>
}

const Analytics = () => {
  return <h2>Analytics (Protected: authenticated user with permission 'analyze' required)</h2>
}

const Admin = () => {
  return <h2>Admin (Protected: authenticated user with role 'admin required')</h2>
}

const ProtectedRoute = ({ user, redirectionPath = '/landing', children }) => {
  if (!user) {
    return <Navigate to={redirectionPath} replace />
  }

  return children ? children : <Outlet />
}


