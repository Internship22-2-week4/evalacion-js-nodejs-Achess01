export default class AuthController {
  constructor({ services, entity, comparePassword, generateToken }) {
    this._services = services
    this._entity = entity
    this._comparePassword = comparePassword
    this._generateToken = generateToken
  }

  async userAuthentication(user) {
    try {
      const founded = await this._services.getByAttribute(
        'users',
        'email',
        user.email
      )
      if (!founded) return this.wrongCredentials()
      const result = this._comparePassword(
        user.password,
        founded.password
      )
      console.log(result)
      if (result) {
        const token = this._generateToken(founded.id)
        return this.loginSuccess(founded, token)
      }
      return this.wrongCredentials()
    } catch (error) {
      return new Error(error)
    }
  }

  wrongCredentials() {
    return new this._entity({
      state: false,
      message: 'Wrong credentials'
    })
  }

  loginSuccess(founded, token) {
    return new this._entity({
      state: true,
      username: founded.username,
      email: founded.email,
      token,
      message: 'Login successful'
    })
  }
}
