import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { useUserGlobalContext } from '../Context/UserContext'
import '../css/Navbar.css'

const Navbar = () => {
  const [show, setShow] = useState(false)
  const [username, setUsername] = useState('')
  const { user } = useUserGlobalContext()

  useEffect(() => {
    // if (user === '') {

    // }
    // setUsername()
  }, [user])


  return (
    <nav className='nav'>
      <div className="nav-container">
        <div className="nav-logo-bars">
          <h1>Reservation!</h1>
          <div className="user-bars">
            <p className='username-mobile'>{user.firstname}</p>
            <FaBars className='bars' onClick={() => setShow(!show)}/>
          </div>
        </div>
        <div className={`links ${show ? 'open' : ''}`} onMouseLeave={() => setShow(!show)}>
          <p className='username-desktop'>{user.firstname}</p>
          <Link to='/' className='link'>Home</Link>
          { 
            user.role === 'admin' ? 
            <Link to='/admin-dashboard' className='link'>
              Admin Dashboard
            </Link> : 
            user.role === 'user' ? 
            <Link 
              to='/create-reservation' className='link'>
              Reservation
            </Link> : ''
          }
          {
            user.firstname === '' ? 
            <Link to='/login-user' className='link'>Login</Link> :
            <Link to='logout-user' className='link'>Logout</Link>
          }
          <Link to='/about' className='link'>About</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar