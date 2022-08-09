import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
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

  function makeActive(e) {
    const links = [...document.getElementsByClassName("link")]
    links.forEach(link => {
      link.className = "link"
    })
    e.target.className = "link active"
  }


  return (
    <nav className='nav'>
      <div className="nav-container">
        <div className="nav-logo-bars">
          <h1>Reservation!</h1>
          <div className="user-bars">
            <p className='username-mobile'>{user.firstname}</p>
            {
              !show ? 
              <FaBars className='bars' onClick={() => setShow(!show)}/> : 
              <FaTimes className='times' onClick={() => setShow(!show)}/>
            }
          </div>
        </div>
        <div className={`links ${show ? 'open' : ''}`} onMouseLeave={() => setShow(!show)}>
          <p className='username-desktop'>{user.firstname}</p>
          <Link 
            to='/' 
            className='link' 
            onClick={(e) => makeActive(e)}>
            Home
          </Link>
          { 
            user.role === 'admin' ? 
            <Link 
              to='/admin-dashboard' 
              className='link' 
              onClick={(e) => makeActive(e)}>
              Admin Dashboard
            </Link> : 
            user.role === 'user' ? 
            <Link 
              to='/create-reservation' 
              className='link' 
              onClick={(e) => makeActive(e)}>
              Reservation
            </Link> : ''
          }
          {
            user.firstname === '' ? 
            <Link 
              to='/login-user' 
              className='link' 
              onClick={(e) => makeActive(e)}>
              Login
            </Link> :
            <Link 
              to='logout-user' 
              className='link' 
              onClick={(e) => makeActive(e)}>
              Logout
            </Link>
          }
          <Link 
            to='/about' 
            className='link' 
            onClick={(e) => makeActive(e)}>
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar