class PhotoRouter {
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
      this._checkToken,
      this._validateCreate,
      this.handleCreatePhoto.bind(this)
    )
    // Request
    this._router.get('/', this._checkToken, this.handleGetAllPhotos.bind(this))
    this._router.get('/:id', this._checkToken, this.handleGetPhoto.bind(this))
    // Update
    this._router.put(
      '/:id',
      this._checkToken,
      this._validateUpdate,
      this.handleUpdatePhoto.bind(this)
    )
    // Delete
    this._router.delete(
      '/:id',
      this._checkToken,
      this.handleDeletePhoto.bind(this)
    )
  }

  async handleCreatePhoto(req, res) {
    const idUser = res.locals.user.id
    const photo = req.body
    photo.idOwner = idUser
    photo.addedAt = new Date()
    const result = await this._controller.create(photo)
    if (result) {
      this._response.success(req, res, result, this._httpCode.CREATED)
    } else {
      this._response.error(
        req,
        res,
        'Photo not created',
        this._httpCode.BAD_REQUEST
      )
    }
  }

  async handleGetAllPhotos(req, res) {
    const result = await this._controller.getAll()
    if (result) {
      this._response.success(req, res, result, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.CREATED)
    }
  }

  async handleGetPhoto(req, res) {
    const { id } = req.params
    const result = await this._controller.getOne(id)
    if (result) {
      this._response.success(req, res, result, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.CREATED)
    }
  }

  async handleUpdatePhoto(req, res) {
    const { id } = req.params
    const content = req.body
    const result = await this._controller.update(id, content)
    if (result) {
      this._response.success(req, res, result, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.CREATED)
    }
  }

  async handleDeletePhoto(req, res) {
    const { id } = req.params
    const result = await this._controller.delete(id)
    if (result) {
      this._response.success(req, res, result, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.CREATED)
    }
  }
}

export default PhotoRouter
