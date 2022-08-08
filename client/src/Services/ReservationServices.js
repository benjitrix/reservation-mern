// reservation services
import { ServerURL } from './ServerURL'

const url = ServerURL + 'api/v1/reservation'
const urls = ServerURL + 'api/v1/reservations'

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
  updateReservation: (id, token) => {
    return fetch(`${url}/update/${id}`, {
      method: 'PATCH',
      headers: { Authorization: token }
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