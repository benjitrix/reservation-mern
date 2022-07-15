import React, { useState, useEffect, useContext } from 'react'
import Seat from './Seat'
import ReservationServices from '../Services/ReservationServices'
import { useReservationGlobalContext, ReservationContext } from '../Context/ReservationContext'
import { useUserGlobalContext } from '../Context/UserContext'
import '../css/FloorReservations.css'

const FloorReservations = () => {
  const [mainHallLeftWingSeats, setMainHallLeftWingSeats] = useState([]) 
  const [mainHallRightWingSeats, setMainHallRightWingSeats] = useState([])

  // lettering, numbering
  const [mainHallSeatRowNumbers, setMainHallSeatRowNumbers] = useState([])
  const [mainHallSeatColumnLetters, setMainHallSeatColumnLetters] = useState([])

  const { token } = useUserGlobalContext
  const { reservations, fetchAllReservations, reservationIsChanged, position, wing } = useReservationGlobalContext()
  const reservationContext = useContext(ReservationContext)

  useEffect(() => {
    setMainHallLeftWingSeatsLayout()
    setMainHallRightWingSeatsLayout()
    
    // lettering, numbering
    setMainHallColumnLettering()
    setMainHallRowNumbering()
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

// lay out MAIN HALL left wing seats
const setMainHallLeftWingSeatsLayout = () => {
  let myMatrix = []
  const rows = 10
  const columns = 10

  for(let i = 1; i <= rows; i++) {
    for(let j = 0; j < columns; j++) {
      myMatrix.push({position: i + (j + 10).toString(36).toUpperCase(), wing: "hall-left", name: '', reserved: false, userReservation: false})
    }
  }
  setMainHallLeftWingSeats(myMatrix)
}

// lay out MAIN HALL right wing seats
const setMainHallRightWingSeatsLayout = () => {
  let myMatrix = []
  const rows = 10
  const columns = 10

  for(let i = 1; i <= rows; i++) {
    for(let j = 0; j < columns; j++) {
      myMatrix.push({position: i + (j + 10).toString(36).toUpperCase(), wing: "hall-right", name: '', reserved: false, userReservation: false})
    }
  }
  setMainHallRightWingSeats(myMatrix)
}

// lettering
  const setMainHallColumnLettering = () => {
    let columnLetters = []
    const columns = 10

    for (let i = 0; i < columns; i++) {
      columnLetters.push((i + 10).toString(36).toUpperCase())
    }
    setMainHallSeatColumnLetters(columnLetters)
  }

// numbering
  const setMainHallRowNumbering = () => {
    let rowNumbers = []
    const rows = 10

    for (let j = 1; j <= rows; j++) {
      rowNumbers.push(j)
    }
    setMainHallSeatRowNumbers(rowNumbers)
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

  // highlight reserved main hall seats
  const updateSeatReservationStatus = () => {
    const mainHallSeats = mainHallLeftWingSeats.concat(mainHallRightWingSeats)
    reservations.forEach(reservation => {
      mainHallSeats.forEach(mainHallSeat => {
        if (reservation.position === mainHallSeat.position && reservation.wing === mainHallSeat.wing) {
          mainHallSeat.name = reservation.name
          mainHallSeat.reserved = reservation.reserved
        }
      })
    })
  }

    // highlight user's reservation
  const showUserReservation = () => {
    const mainHallSeats = mainHallLeftWingSeats.concat(mainHallRightWingSeats)
    if (position === '' && wing === '') {
      console.log('User has no reservation available');
    } else {
      mainHallSeats.forEach((seat, i) => {
        if (seat.position === position && seat.wing === wing) {
          seat.userReservation = true
        }
      })
    }
  }

  return (
    <section className="hall-reservations">
      <div className="hall-reservations-container">
        <h1 id='main-hall-heading'>Main Hall</h1>
        <div className="main-hall">
          <div className="left-wing">
            <h1>Left Wing</h1>
            <div className="left-wing-container">
              <div className='left-wing-column-letters'>
                {
                  mainHallSeatColumnLetters.map((column, index) => {
                    return <p className='column' key={index}>{column}</p>
                  })
                }
              </div>
              <div className='row-numbers-left-seats'>
                <div className='left-row-numbers'>
                  {
                    mainHallSeatRowNumbers.map((row, index) => {
                      return <p className='row' key={index}>{row}</p>
                    })
                  }
                </div>
                <div className="left-seats">
                  {
                    mainHallLeftWingSeats.map((seat, index) => {
                      return (
                        <Seat
                          position={seat.position}
                          wing={seat.wing}
                          name={seat.name}
                          reserved={seat.reserved}
                          userReservation={seat.userReservation} 
                          seatDetails={() => getSeatDetails(seat.position, seat.wing)} 
                          key={index} />
                      )
                    })
                  }
                </div>
              </div> 
            </div>
          </div>
          <div className="right-wing">
            <h1>Right Wing</h1>
            <div className="right-wing-container">
              <div className='right-wing-column-letters'>
                {
                  mainHallSeatColumnLetters.map((column, index) => {
                    return <p className='column' key={index}>{column}</p>
                  })
                }
              </div>
              <div className="row-numbers-right-seats">
                <div className="right-seats">
                  {
                    mainHallRightWingSeats.map((seat, index) => {
                      return (
                        <Seat
                          position={seat.position}
                          wing={seat.wing}
                          name={seat.name}
                          reserved={seat.reserved}
                          userReservation={seat.userReservation} 
                          seatDetails={() => getSeatDetails(seat.position, seat.wing)}
                          key={index} />
                      )
                    })
                  }
                </div>
                <div className='right-row-numbers'>
                  {
                    mainHallSeatRowNumbers.map((row, index) => {
                      return <p className='row' key={index}>{row}</p>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FloorReservations
