// reservation services
import { ServerURL } from './ServerURL'

const url = ServerURL + 'api/v1/reservation'
const urls = ServerURL + 'api/v1/reservations'
// const url = 'api/v1/reservation'
// const urls = 'api/v1/reservations'

export default {
  getAllReservations: () => {
    return fetch(`${urls}/all`)
      .then(res => res.json())
      .then(data => data)
  },
  registerForEvent: (registration, token) => {
    return fetch(`${url}/register`, {
      method: 'POST',
      body: JSON.stringify(registration),
      headers: {
        "Content-type": "application/json",
        Authorization: token
      }
    }).then(res => res.json())
      .then(data => data)
  },
  getReservation: (token) => {
    return fetch(`${url}/user`, {
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  },
  updateReservation: (update, token) => {
    return fetch(`${url}/update`, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 
        "Content-Type": "application/json",
        Authorization: token 
      }
    }).then(res => res.json())
      .then(data => data)
  },
  deleteReservation: (token) => {
    return fetch(`${url}/delete`, {
      method: 'DELETE',
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)   
  }
}