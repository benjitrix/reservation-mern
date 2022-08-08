// auth services
import { ServerURL } from './ServerURL'

const url = ServerURL + 'api/v1/user'

export default {
  registerUser: (user) => {
    return fetch(`${url}/register-user`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { "Content-type": "application/json" }
    }).then(res => res.json())
      .then(data => data)
  },
  loginUser: (user) => {
    return fetch(`${url}/login-user`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { "Content-type": "application/json" }
    }).then(res => res.json())
      .then(data => data)
  },
  updateUser: (update, userId) => {
    return fetch(`${url}/update-user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(update),
      headers: { "Content-type": "applicaton/json" }
    }).then(res => res.json())
      .then(data => data)
  },
  deleteUser: (userId) => {
    return fetch(`${url}/delete-user/${userId}`)
      .then(res => res.json())
      .then(data => data)
  },
  isAuthorized: (token) => {
    return fetch(`${url}/check/authorize`, {
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)
  }
}