import React, { useContext, useState, useEffect } from 'react'
import AuthServices from '../Services/AuthServices'

export const UserContext = React.createContext()

export const UserProvider = ({children}) => {
  const [user, setUser] = useState({firstname: '', lastname: '', role: ''})
  const [alert, setAlert] = useState('')
  const [error, setError] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkToken = localStorage.getItem('seat-reservation-token')
    if (checkToken === null) {
      setIsLoading(false)
      return console.log('No token retrieved');
    } else {
      AuthServices.isAuthorized(checkToken).then(data => {
        setUser({
          firstname: data.message.msgBody.firstname,
          lastname: data.message.msgBody.lastname,
          role: data.message.msgBody.role
        })
        setIsLoading(false)
        setToken(checkToken)
      })
    }
  }, [token])

  return (
    <div>
      { isLoading ? <h1>Loading...</h1> :  
        <UserContext.Provider value={{
          user,
          alert,
          error,
          isAuthenticated,
          token,
          setUser,
          setAlert,
          setError,
          setIsAuthenticated,
          setToken,
          setIsLoading
        }}>
          {children}
        </UserContext.Provider> 
      }
    </div>
  )
}

export const useUserGlobalContext = () => {
  return useContext(UserContext)
}