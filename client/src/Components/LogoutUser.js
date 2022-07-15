import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserGlobalContext } from '../Context/UserContext'
import '../css/LogoutUser.css'

const LogoutUser = () => {
  const navigate = useNavigate()
  const { setUser, setAlert, setError } = useUserGlobalContext()

  const yesLogout = () => {
    localStorage.removeItem('seat-reservation-token')
    setTimeout(() => {
      setUser({firstname: '', lastname: '', role: ''})
      setAlert('User has logged out')
      navigate('/', { replace: true })
    }, 1500)
  }

  const doNotLogout = () => {
    setTimeout(() => {
      navigate('/', { replace: true })
    }, 500)
  }

  return (
    <section className="logout">
      <div className="logout-container">
        <p className='logout-confirm'>Do you wish to logout?</p>
        <div className='logout-options'>
          <p
            onClick={() => yesLogout()} 
            className='logout-btn yes-logout'
            >
            Yes
          </p>
          <p
            onClick={() => doNotLogout()}
            className='logout-btn no-logout'
          >
            No
          </p>
        </div>
      </div>
    </section>
  )
}

export default LogoutUser