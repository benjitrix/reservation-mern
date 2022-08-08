import React, { useEffect } from 'react'
import { FaTimesCircle } from 'react-icons/fa'
import { useUserGlobalContext } from '../Context/UserContext'
import '../css/Message.css'

const Message = ({alert, error}) => {
  const { setAlert } = useUserGlobalContext()

  useEffect(() => {
    setTimeout(() => {
      setAlert('')
    }, 1800)
  }, [])

  const closeMessage = () => {
    setAlert('')
  }

  return (
    <section className={`message ${error ? 'true' : ''}`}>
      <div className="message-container">
        <p>{alert}</p>
      </div>
      <FaTimesCircle className='close-message' onClick={() => closeMessage()}/>
    </section>
  )
}

export default Message