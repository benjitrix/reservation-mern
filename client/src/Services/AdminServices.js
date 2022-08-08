// admin reservation
import { ServerURL } from './ServerURL'

const url = ServerURL + 'api/v1/admin'

export default {
  adminRegisterForEvent: (registration, token) => {
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
  adminDeleteReservation: (token) => {
    return fetch(`${url}.delete`, {
      method: 'DELETE',
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  }
}