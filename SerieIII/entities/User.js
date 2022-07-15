class User {
  constructor({ email, password, username }) {
    this._email = email
    this._password = password
    this._username = username
    this._id = null
  }

  get email() {
    return this._email
  }

  get password() {
    return this._password
  }

  get username() {
    return this._username
  }

  get id() {
    return this._id
  }

  encryptPassword(password, hashPassword) {
    this._password = hashPassword(password)
  }
}

export default User
