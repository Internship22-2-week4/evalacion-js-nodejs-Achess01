class Auth {
  constructor({ state, username, email, token, message }) {
    this._auth = state || false
    this._username = username || ''
    this._email = email || ''
    this._token = token || ''
    this._message = message || ''
  }

  get auth() {
    return this._auth
  }

  get username() {
    return this._username
  }

  get email() {
    return this._email
  }

  get token() {
    return this._token
  }

  get message() {
    return this._message
  }
}

export default Auth
