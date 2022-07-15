import React, { useState, useEffect, useContext } from 'react'
import Seat from './Seat'
import ReservationServices from '../Services/ReservationServices'
import { ReservationContext, useReservationGlobalContext } from '../Context/ReservationContext'
import { useUserGlobalContext } from '../Context/UserContext'
import '../css/EmporiumReservations.css'

const EmporiumReservations = () => {
  
  const [emporiumLeftSeats, setEmporiumLeftSeats] = useState([])
  const [emporiumRightSeats, setEmporiumRightSeats] = useState([])

  // lettering, numbering
  const [emporiumSeatRowNumbers, setEmporiumSeatRowNumbers] = useState([])
  const [emporiumSeatColumnLetters, setEmporiumSeatColumnLetters] = useState([])

  const { token } = useUserGlobalContext()
  const { fetchAllReservations, reservations,reservationIsChanged, position, wing } = useReservationGlobalContext()
  const reservationContext = useContext(ReservationContext)

  useEffect(() => {
    setEmporiumLeftSeatsLayout()
    setEmporiumRightSeatsLayout()
    
    // lettering, numbering
    setEmporiumColumnLettering()
    setEmporiumRowNumbering()
  }, [])

  useEffect(() => {
    fetchAllReservations()
    fetchUserReservation()
  }, [reservationIsChanged])

  useEffect(() => {
    updateSeatReservationStatus()
  }, [reservations])

  useEffect(() => {
    showUserReservation()
  }, [position, wing])

  // lay out EMPORIUM left seats
  const setEmporiumLeftSeatsLayout = () => {
  let myMatrix = []
  const rows = 5
  const columns = 5

  for(let i = 1; i <= rows; i++) {
    for(let j = 0; j < columns; j++) {
      myMatrix.push({position: i + (j + 10).toString(36).toUpperCase(), wing: "emporium-left", name: '', reserved: false, userReservation: false})
    }
  }
  setEmporiumLeftSeats(myMatrix)
}

  // lay out EMPORIUM right seats
  const setEmporiumRightSeatsLayout = () => {
  let myMatrix = []
  const rows = 5
  const columns = 5

  for(let i = 1; i <= rows; i++) {
    for(let j = 0; j < columns; j++) {
      myMatrix.push({position: i + (j + 10).toString(36).toUpperCase(), wing: "emporium-right", name: '', reserved: false, userReservation: false})
    }
  }
  setEmporiumRightSeats(myMatrix)
}

// lettering
  const setEmporiumColumnLettering = () => {
    let columnLetters = []
    const columns = 5

    for (let i = 0; i < columns; i++) {
      columnLetters.push((i + 10).toString(36).toUpperCase())
    }
    setEmporiumSeatColumnLetters(columnLetters)
  }

// numbering
  const setEmporiumRowNumbering = () => {
    let rowNumbers = []
    const rows = 5

    for (let j = 1; j <= rows; j++) {
      rowNumbers.push(j)
    }
    setEmporiumSeatRowNumbers(rowNumbers)
  }

  // get seat info
  const getSeatDetails = (position, wing) => {
    console.log(position, wing);
  }

  // fetch user reservation
  const fetchUserReservation = () => {
    ReservationServices.getReservation(token).then(data => {
      reservationContext.setPosition(data.message.position)
      reservationContext.setWing(data.message.wing)
      console.log(data);
    })
  }

  // highlight reserved emporium seats
  const updateSeatReservationStatus = () => {
    const emporiumSeats = emporiumLeftSeats.concat(emporiumRightSeats)

    for (let i = 0; i < reservations.length; i++) {
      for (let j = 0; j < emporiumSeats.length; j++) {
        if (reservations[i].position === emporiumSeats[j].position && reservations[i].wing === emporiumSeats[j].wing) {
          emporiumSeats[j].name = reservations[i].name
          emporiumSeats[j].reserved = reservations[i].reserved
        }
      }
    }
  }

  // highlight user's reservation
  const showUserReservation = () => {
    const emporiumSeats = emporiumLeftSeats.concat(emporiumRightSeats)
    if (position === '' && wing === '') {
      console.log('User has no reservation available');
    } else {
      emporiumSeats.forEach((seat, i) => {
        if (seat.position === position && seat.wing === wing) {
          seat.userReservation = true
        }
      })
    }
  }

  return (
    <section className="emporium-reservations">
      <div className="emporium-reservations-container">
        <p>Emporium</p>
        <div className="emporium-wing">
          <div className="emporium-left-wing">
            <div className='emporium-left-column-letters'>
              {
                emporiumSeatColumnLetters.map((column, index) => {
                  return <p className='emporium-column' key={index}>{column}</p>
                })
              }
            </div>
            <div className="row-numbers-left-seats">
              <div className='emporium-left-row-numbers'>
                {
                  emporiumSeatRowNumbers.map((row, index) => {
                    return <p className='emporium-row' key={index}>{row}</p>
                  })
                }
              </div>
              <div className="emporium-wing-seats">
                {
                  emporiumLeftSeats.map((seat, index) => {
                    return (
                      <Seat 
                        position={seat.position}
                        wing={seat.wing} 
                        name={seat.name} 
                        reserved={seat.reserved}
                        userReservation={seat.userReservation}
                        seatDetails={() => getSeatDetails(seat.position, seat.wing)} 
                        key={index}
                      />
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className="emporium-right-wing">
            <div className='emporium-right-column-letters'>
              {
                emporiumSeatColumnLetters.map((column, index) => {
                  return <p className='emporium-column' key={index}>{column}</p>
                })
              }
            </div>
            <div className="row-numbers-right-seats">
              <div className="emporium-wing-seats">
                {
                  emporiumRightSeats.map((seat, index) => {
                    return (
                      <Seat 
                        position={seat.position}
                        wing={seat.wing} 
                        name={seat.name} 
                        reserved={seat.reserved} 
                        userReservation={seat.userReservation}
                        seatDetails={() => getSeatDetails(seat.position, seat.wing)} 
                        key={index} 
                      />
                    )
                  })
                }
              </div>
              <div className='emporium-right-row-numbers'>
                {
                  emporiumSeatRowNumbers.map((row, index) => {
                    return <p className='emporium-row' key={index}>{row}</p>
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmporiumReservations
