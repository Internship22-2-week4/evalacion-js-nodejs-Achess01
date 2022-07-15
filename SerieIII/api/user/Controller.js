class UserController {
  constructor({ service, entity, hashPassword }) {
    this._service = service
    this._entity = entity
    this._hashPassword = hashPassword
  }

  async create(user) {}

  async getAll() {}

  async getOne(id, query) {}

  async update(id, content) {}

  async delete(id) {}
}

export default UserController
