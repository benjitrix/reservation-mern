import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserGlobalContext } from '../Context/UserContext'
import AuthServices from '../Services/AuthServices'
import '../css/LoginUser.css'

const LoginUser = () => {
  const [user, setUser] = useState({email: '', password: ''})
  const { setAlert, setError, setIsAuthenticated, setToken } = useUserGlobalContext()

  const navigate = useNavigate()

  // input change handler
  const onChangeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  // log-in user
  const onSubmitHandler = (e) => {
    e.preventDefault()
    AuthServices.loginUser(user).then(data => {
      if (data.message.isAuthenticated) {
        setAlert(data.message.msgBody)
        setError(data.message.msgError)
        setIsAuthenticated(data.message.isAuthenticated)
        setToken(data.message.token)
        localStorage.setItem('seat-reservation-token', `Bearer ${data.message.token}`)
        console.log(data);
      } else {
        setAlert('User not authorized')
        setError(true)
      }
    })
    setTimeout(() => {
      navigate('/', { replace: true })
    }, 1500)
  }

  return (
    <section className="login-user">
      <h1>Login</h1>
      <div className="login-user-container">
        <form onSubmit={onSubmitHandler}>
        <label>Email: </label>
          <input 
            type="email" 
            name='email' 
            value={user.email} 
            onChange={(e) => onChangeHandler(e)} className='login-user-input' 
          />
          <label>Password: </label>
          <input 
            type="password" 
            name='password' 
            value={user.password} 
            onChange={(e) => onChangeHandler(e)} className="login-user-input" 
          />
          <input 
            type="submit" 
            value='Submit' 
            className='login-user-input login-user-btn' 
          />
          <p>Not Registered? <Link to='/register-user'>Sign Up</Link></p>
        </form>
      </div>
    </section>
  )
}

export default LoginUser