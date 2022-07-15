import React from 'react'
import EmporiumReservations from './EmporiumReservations'
import FloorReservations from './FloorReservations'
import '../css/Hall.css'

const Hall = () => {
  return (
    <section className="hall">
      <div className="hall-container">
        <EmporiumReservations />
        <FloorReservations />
      </div>
    </section>
  )
}

export default Hall