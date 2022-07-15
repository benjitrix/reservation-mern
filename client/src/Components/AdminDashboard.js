import React, { useState } from 'react'
import ReservationServices from '../Services/ReservationServices'
import Hall from './Hall'
import { useUserGlobalContext } from '../Context/UserContext'
import { useReservationGlobalContext } from '../Context/ReservationContext'
import '../css/AdminDashboard.css'

const AdminDashboard = () => {
  const [severalReservations, setSeveralReservations] = useState([])
  const { token, setAlert, setError, setIsLoading  } = useUserGlobalContext()
  const { reservation, setReservations, setReservationIsChanged } = useReservationGlobalContext()

  // admin register reservation
  const registerReservationHandler = (e) => {
    e.preventDefault()
    ReservationServices.registerForEvent(reservation, token).then(data => {
      setAlert(data.message.msgBody)
      setError(data.message.msgError)
      setReservationIsChanged(true)
      setIsLoading(false)
      console.log(data);
    })
    console.log(severalReservations);
  }

  // admin register reservation to bear another's name
  const registerAnothersReservation = (e) => {
    e.preventDefault()
  }

  // delete admin-made reservations
  const deleteReservationHandler = (e) => {
    e.preventDefault()
    ReservationServices.deleteReservation(token).then(data => {
      setAlert(data.message.msgBody)
      setError(data.message.msgError)
      console.log(data);
    })
  }

  // admin delete any reservation
  const deleteAnyReservation = (e) => {
    e.preventDefault()
  }

  // block several reservations
  const blockSeveralReservations = (e) => {
    e.preventDefault()
    setSeveralReservations(prevReservations => [...prevReservations, reservation])
    console.log(severalReservations);
  }


  return (
    <section className="admin-dashboard">
      <div className="admin-dashboard-container">
        <h1>Operations</h1>
        <div className="operations">
          <div className='registration-by-admin'>
            <p>Register</p>
            <div className='registration-by-admin-container'>
              <div className='admin-register'>
                <p>Register by Admin</p>
                <form onSubmit={registerReservationHandler}>
                  <input 
                    type="text" 
                    name='name'
                    value={`${reservation.position} ${reservation.wing}`}
                    readOnly
                    className="admin-register-input admin-input"
                  />
                  <input  
                    type="submit"
                    value="Admin Register Reservation"
                    className="admin-register-btn admin-input"
                  />
                </form>
              </div>
              <div className='admin-register'>
                <p>Register for Another</p>
                <form onSubmit={registerAnothersReservation}>
                  <input 
                    type="text" 
                    name='name'
                    value={`${reservation.position} ${reservation.wing}`}
                    readOnly
                    className="admin-register-input admin-input"
                  />
                  <input  
                    type="submit"
                    value="Admin Register Reservation"
                    className="admin-register-btn admin-input"
                  />
                </form>
              </div>
            </div>
            
          </div>
          <div className='delete-by-admin'>
            <p>Delete</p>
            <div className="delete-by-admin-container">
              <div className="admin-delete">
                <p>Delete by Admin</p>
                <form onSubmit={deleteReservationHandler}>
                  <input  
                    type="text"
                    name='name'
                    value={`${JSON.stringify(reservation)}`}
                    readOnly
                    className="admin-delete-input admin-input"
                  />
                  <input  
                    type="submit"
                    value="Delete Reservation"
                    className='admin-delete-btn admin-input'
                  />
                </form>
              </div>
              <div className="admin-delete">
                <p>Delete Any Reservation</p>
                <form onSubmit={deleteAnyReservation}>
                  <input  
                    type="text"
                    name='name'
                    value={`${JSON.stringify(reservation)}`}
                    readOnly
                    className="admin-delete-input admin-input"
                  />
                  <input  
                    type="submit"
                    value="Delete Reservation"
                    className='admin-delete-btn admin-input'
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="admin-block-reservations">
            <p>Admin Reservations</p>
            <form onSubmit={blockSeveralReservations}>
              <input 
                type="text" 
                name='admin-reservations'
                value={`${reservation.position} ${reservation.wing}`}
                readOnly
                className='admin-reservations-input admin-input'
              />
              <input 
                type="submit" 
                value='Reserve Seats'
                className='admin-reservations-btn admin-input'
              />
            </form>
          </div>
        </div>
        <div className="hall-view">
          <Hall />
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard