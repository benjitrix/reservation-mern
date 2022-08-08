import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthServices from '../Services/AuthServices'
import { useUserGlobalContext } from '../Context/UserContext'
import '../css/RegisterUser.css'

const RegisterUser = () => {
  const [user, setUser] = useState({firstname: '', lastname: '', email: '', password: ''})
  const { setAlert, setError } = useUserGlobalContext()

  const navigate = useNavigate()

  // input change handler
  const onChangeHandler = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  // register user in db
  const onSubmitHandler = (e) => {
    e.preventDefault()
    AuthServices.registerUser(user).then(data => {
      console.log(data);
      setAlert(data.message.msgBody)
      setError(data.message.msgError)
      console.log(user); 
    })    

    setTimeout(() => {
      navigate('/login-user', {replace: true})
    }, 1500)
  }

  return (
    <section className="register-user">
      <h1>Register</h1>
      <div className="register-user-container">
        <form onSubmit={onSubmitHandler}>
          <label>First Name: </label>
          <input 
            type="text"
            name="firstname"
            value={user.firstname}
            onChange={(e) => onChangeHandler(e)}
            className="register-user-input"
          />
          <label>Last Name: </label>
          <input 
            type="text" 
            name='lastname' 
            value={user.lastname}
            onChange={(e) => onChangeHandler(e)} className="register-user-input"
          />
          <label>Email: </label>
          <input 
            type="email" 
            name='email' 
            value={user.email} 
            onChange={(e) => onChangeHandler(e)} className="register-user-input" 
          />
          <label>Password: </label>
          <input 
            type="password" 
            name='password' 
            value={user.password} 
            onChange={(e) => onChangeHandler(e)} className="register-user-input" 
          />
          <input 
            type="submit" 
            value="Submit" 
            className="register-user-input register-user-btn" 
          />
          <p>Already registered? <Link to='/login-user'>Login</Link></p>
        </form>
      </div>
    </section>
  )
}

export default RegisterUser