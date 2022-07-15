class UserRouter {
  constructor({
    router,
    controller,
    response,
    httpCode,
    validateCreate,
    validateUpdate,
    checkToken
  }) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this._validateCreate = validateCreate
    this._validateUpdate = validateUpdate
    this._checkToken = checkToken

    this.registerRoutes()
  }

  registerRoutes() {
    // Create
    this._router.post(
      '/',
      this._validateCreate,
      this.handleCreateUser.bind(this)
    )
    // Request
    this._router.get('/', this._checkToken, this.handleGetAllUsers.bind(this))
    this._router.get('/:id', this._checkToken, this.handleGetUser.bind(this))
    // Update
    this._router.put(
      '/:id',
      this._checkToken,
      this._validateUpdate,
      this.handleUpdateUser.bind(this)
    )
    // Delete
    this._router.delete(
      '/:id',
      this._checkToken,
      this.handleDeleteUser.bind(this)
    )
  }

  async handleCreateUser(req, res) {
    this._response.success(req, res, 'Creado buena', this._httpCode.CREATED)
  }

  async handleGetAllUsers(req, res) {}

  async handleGetUser(req, res) {}

  async handleUpdateUser(req, res) {}

  async handleDeleteUser(req, res) {}
}

export default UserRouter
