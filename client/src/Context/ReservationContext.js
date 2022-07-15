import React, { useContext, useState } from 'react'
import ReservationServices from '../Services/ReservationServices'
import { useUserGlobalContext } from './UserContext'


export const ReservationContext = React.createContext()

export const ReservationProvider = ({children}) => {
  const [reservation, setReservation] = useState({name: '', position: '', wing: '', reserved: false})
  const [reservations, setReservations] = useState([])
  const [reservationIsChanged, setReservationIsChanged] = useState(false)
  const [position, setPosition] = useState('')
  const [wing, setWing] = useState('')
  const { setIsLoading } = useUserGlobalContext()

  const fetchAllReservations = () => {
    ReservationServices.getAllReservations().then(data => {
      setReservations(data.message.reservations)
      setReservationIsChanged(true)
      setIsLoading(false)
    })
  }

  return (
    <ReservationContext.Provider value={{
      reservation,
      reservations,
      reservationIsChanged,
      position,
      wing,
      setReservation,
      setReservations,
      setReservationIsChanged,
      fetchAllReservations,
      setPosition,
      setWing
      }}
    >
      {children}
    </ReservationContext.Provider>
  )
}

export const useReservationGlobalContext = () => {
  return useContext(ReservationContext)
}