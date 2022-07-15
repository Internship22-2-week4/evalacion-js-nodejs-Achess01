class UserController {
  constructor({ service, entity, hashPassword }) {
    this._service = service
    this._entity = entity
    this._hashPassword = hashPassword
  }

  async create(user) {
    const newUser = new this._entity(user)
    const founded = await this._service.getByAttribute(
      'users',
      'email',
      newUser.email
    )
    if (founded) return 1
    newUser.encryptPassword(user.password, this._hashPassword)
    const { username, email, password } = newUser
    const response = await this._service.save('users', {
      username,
      email,
      password
    })
    return response
  }

  async getAll() {
    const users = await this._service.getDataFromTable('users')
    return users
  }

  async getOne(id, query) {
    const user = await this._service.getEntity('users', id)
    return user
  }

  async update(id, content) {
    const { password } = content
    if (password) {
      const newPass = this._hashPassword(password)
      content.password = newPass
    }
    const updated = await this._service.update('users', id, content)
    return updated
  }

  async delete(id) {
    const deleted = await this._service.delete('users', id)
    return deleted
  }
}

export default UserController
