import React, { useEffect, useState, useContext } from 'react'
import Hall from './Hall'
import ReservationServices from '../Services/ReservationServices'
import { useReservationGlobalContext } from '../Context/ReservationContext'
import { useUserGlobalContext } from '../Context/UserContext'
import { ReservationContext } from '../Context/ReservationContext'
import '../css/RegisterForEvent.css'

const RegisterForEvent = () => {
  const { token } = useUserGlobalContext()
  const { reservation, reservationIsChanged, setReservationIsChanged, fetchAllReservations, position, wing } = useReservationGlobalContext()
  const { setIsLoading, setAlert, setError } = useUserGlobalContext()
  const reservationContext = useContext(ReservationContext)

  useEffect(() => {
    fetchAllReservations()
  }, [reservationIsChanged])

  useEffect(() => {
    fetchUserReservation()
  }, [position])
  
  // submit user's reservation request
  const onSubmitRegistrationHandler = (e) => {
    e.preventDefault()
    console.log(reservation);
    if (reservation.position === '' || reservation.wing === '') {
      setAlert("Seat not selected")
      setError(true)
      return 
    }
    ReservationServices.registerForEvent(reservation, token).then(data => {
      setAlert(data.message.msgBody)
      setError(data.message.msgError)
      setReservationIsChanged(true)
      setIsLoading(false)
      console.log(data);
    })
    setReservationIsChanged(false)
  }

  // submit user's reservation update request
  const onSubmitUpdateHandler = (e) => {
    e.preventDefault()
    if (reservation.position === '' || reservation.wing === '') {
      setAlert("Substitute seat not selected")
      setError(true)
    }
    ReservationServices.updateReservation(reservation, token).then(data => {
      setAlert(data.message.msgBody)
      setError(data.message.msgError)
      setReservationIsChanged(true)
      setIsLoading(false)
      console.log(data);
    })
  }

  // submit user's reservation delete request
  const onSubmitDeleteHandler = (e) => {
    e.preventDefault()
    ReservationServices.deleteReservation(token).then(data => {
      setAlert(data.message.msgBody)
      setError(data.message.msgError)
      setReservationIsChanged(true)
      setIsLoading(false)
      console.log(data);
    })
  }

  // fetch user's reservation status
  const fetchUserReservation = () => {
    ReservationServices.getReservation(token).then(data => {
      reservationContext.setPosition(data.message.position)
      reservationContext.setWing(data.message.wing)
      console.log('User reservation: ',data);
    })
  }

  return (
    <section className="register-for-event">
      <div className="register-for-event-container">
        <div className="register-delete-update">
          {/* make reservation */}
          <div className='registration-input'>
            <h2>Register for Event</h2>
            <form onSubmit={onSubmitRegistrationHandler} className='registration-form'>
              <input 
                type="text" 
                name='registration'
                value={`${position === undefined ? reservation.position : ''} ${position === undefined ?  reservation.wing : ''}`}
                readOnly
                className='registration-user-input'
              />
              <input 
                type="submit" 
                value='Submit Registration'
                className='submit-registration-btn registration-btn'
              />
            </form>
          </div>
          {/* change reservation */}
          <div className="update-registration-input">
            <h2>Change Registration</h2>
            <form onSubmit={onSubmitUpdateHandler} className='registration-form'>
              <input 
                type="text" 
                name="update"
                value={`${reservation.position} ${reservation.wing}`}
                readOnly
                className='registration-user-input'
              />
              <input 
                type="submit" 
                value="Change Registration"
                className='update-registration-btn registration-btn'
                />
            </form>
          </div>
          {/* delete reservation */}
          <div className="delete-registration-input">
            <h2>Delete Registration</h2>
            <form onSubmit={onSubmitDeleteHandler} className='registration-form'>
            <input 
              type="text" 
              name='delete'
              value={`${position !== undefined ? position : ''} ${wing !== undefined ? wing : ''}`}
              readOnly
              className='registration-user-input'
            />
            <input 
              type='submit'
              value='Delete Registration'
              className='delete-registration-btn registration-btn'
            />
            </form>
          </div>
        </div>
        <div className='select-seat-in-hall'>
          <Hall className='hall-reservations'/>
        </div>
      </div>
    </section>
  )
}

export default RegisterForEvent