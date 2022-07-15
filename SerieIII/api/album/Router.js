class AlbumRouter {
  constructor({
    router,
    controller,
    response,
    httpCode,
    validateCreate,
    validateUpdate,
    validateAddPhoto,
    checkToken
  }) {
    this._router = router()
    this._controller = controller
    this._response = response
    this._httpCode = httpCode
    this._validateCreate = validateCreate
    this._validateUpdate = validateUpdate
    this._checkToken = checkToken
    this._validateAddPhoto = validateAddPhoto
    this.registerRoutes()
  }

  registerRoutes() {
    // Create
    this._router.post(
      '/',
      this._checkToken,
      this._validateCreate,
      this.handleCreateAlbum.bind(this)
    )
    this._router.post(
      '/',
      this._checkToken,
      this._validateCreate,
      this.handleCreateAlbum.bind(this)
    )
    // Request
    this._router.get('/', this._checkToken, this.handleGetAllAlbums.bind(this))
    this._router.get('/:id', this._checkToken, this.handleGetAlbum.bind(this))
    // Update
    this._router.put(
      '/:id',
      this._checkToken,
      this._validateUpdate,
      this.handleUpdateAlbum.bind(this)
    )
    // Add photo to a playlist
    this._router.patch(
      '/:id',
      this._checkToken,
      this._validateAddPhoto,
      this.handleAddPhoto.bind(this)
    )
    // Delete
    this._router.delete(
      '/:id',
      this._checkToken,
      this.handleDeleteAlbum.bind(this)
    )
  }

  async handleCreateAlbum(req, res) {
    const idUser = res.locals.user.id
    const album = req.body
    album.idOwner = idUser
    const result = await this._controller.create(album)
    if (result) {
      this._response.success(req, res, result, this._httpCode.CREATED)
    } else {
      this._response.error(
        req,
        res,
        'Album not created',
        this._httpCode.BAD_REQUEST
      )
    }
  }

  async handleGetAllAlbums(req, res) {
    const result = await this._controller.getAll()
    if (result) {
      this._response.success(req, res, result, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  async handleGetAlbum(req, res) {
    const { id } = req.params
    const result = await this._controller.getOne(id)
    if (result) {
      this._response.success(req, res, result, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  async handleUpdateAlbum(req, res) {
    const { id } = req.params
    const content = req.body
    const result = await this._controller.update(id, content)
    if (result) {
      this._response.success(req, res, result, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }

  async handleAddPhoto(req, res) {
    const { id } = req.params
    const { idPhoto } = req.body
    console.log(id, idPhoto)
    const result = await this._controller.addPhoto(id, idPhoto)
    if (result) {
      this._response.success(req, res, 'Added', this._httpCode.OK)
    } else {
      this._response.error(
        req,
        res,
        'Not album or photo founded',
        this._httpCode.NOT_FOUND
      )
    }
  }

  async handleDeleteAlbum(req, res) {
    const { id } = req.params
    const result = await this._controller.delete(id)
    if (result) {
      this._response.success(req, res, result, this._httpCode.OK)
    } else {
      this._response.error(req, res, 'Not found', this._httpCode.NOT_FOUND)
    }
  }
}

export default AlbumRouter
