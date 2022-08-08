import React, { useState } from 'react'
import { useReservationGlobalContext } from '../Context/ReservationContext'
import { useUserGlobalContext } from '../Context/UserContext'
import '../css/Seat.css'

const Seat = ({ name, position, wing, reserved, userReservation }) => {
  const [show, setShow] = useState(false)
  const { setReservation } = useReservationGlobalContext()
  const { user, setAlert, setError } = useUserGlobalContext()
  // console.log('User reservation: ', userReservation);

  const seatDetails = () => {
    console.log(position, wing, userReservation);
    if (reserved) {
      setAlert('Seat already reserved')
      setError(true)
    } else {
      setReservation({name: `${user.firstname} ${user.lastname}`, position: position, wing: wing, reserved: true, userReservation: userReservation })
    }
  }

  const showSeatDetails = () => {
    console.log(position);
  }

  return (
    <section className="seat" onClick={() => seatDetails()} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <div className="seat-container">
          <div className={`card-front ${!reserved ? 'rotate' : ''}`}>
            <p className='status'>V</p>
          </div>
          <div className={`card-back ${!reserved ? 'rotate' : ''} ${userReservation ? 'user-reservation' : ''}`}>
            <p className='status'>R</p>
          </div>
          <div className={`${show ? 'show' : 'no-show'}`}>
            <span>{position}</span>, <span>{wing}</span><span>{userReservation}</span>
          </div>
      </div>
      {/* <button onClick={() => setRotate(!rotate)}>{rotate ? "true" : "false"}</button> */}
    </section>
  )
}

export default Seat