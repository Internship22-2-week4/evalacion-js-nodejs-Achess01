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
    const result = await this._controller.create(req.body)
    if (result === 1) {
      this._response.success(
        req,
        res,
        'This email already exists',
        this._httpCode.BAD_REQUEST
      )
    } else if (result) {
      this._response.success(req, res, result, this._httpCode.CREATED)
    } else {
      this._response.error(req, res, 'User not created', this._httpCode.BAD_REQUEST)
    }
  }

  async handleGetAllUsers(req, res) {
    const result = await this._controller.getAll()
    if (result) {
      this._response.success(req, res, result, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Error', this._httpCode.NOT_FOUND)
    }
  }

  async handleGetUser(req, res) {
    const { id } = req.params
    const result = await this._controller.getOne(id)
    if (result) {
      this._response.success(req, res, result, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  async handleUpdateUser(req, res) {
    const { id } = req.params
    const content = req.body
    const result = await this._controller.update(id, content)
    if (result) {
      this._response.success(req, res, result, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  async handleDeleteUser(req, res) {
    const { id } = req.params
    const result = await this._controller.delete(id)
    if (result) {
      this._response.success(req, res, result, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }
}

export default UserRouter
