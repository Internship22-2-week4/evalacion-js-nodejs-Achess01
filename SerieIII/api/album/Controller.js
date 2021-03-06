class AlbumController {
  constructor({ service, entity, hashPassword }) {
    this._service = service
    this._entity = entity
    this._hashPassword = hashPassword
  }

  async create(album) {
    const newAlbum = new this._entity(album)
    const { name, description, idOwner } = newAlbum
    const response = await this._service.save('albums', {
      name,
      description,
      idOwner
    })
    return response
  }

  async getAll() {
    const albums = await this._service.getAll('albums')
    return albums
  }

  async getOne(id, query) {
    const album = await this._service.getById('albums', id)
    if (!album) return null
    const photoalbums = await this._service.getAll('photoalbums', {
      idAlbum: album._id
    })
    let resultPhotos = []
    if (photoalbums.length > 0) {
      // phA: relation between photo and album
      const ids = photoalbums.map((phA) => phA.idPhoto)
      const query = { _id: { $in: ids } }
      resultPhotos = await this._service.getAll('photos', query)
      if (!resultPhotos) return null
      console.log(resultPhotos)
      console.log(album)
    }
    return Object.assign({ photos: resultPhotos }, album._doc)
  }

  async update(id, content) {
    const { password } = content
    if (password) {
      const newPass = this._hashPassword(password)
      content.password = newPass
    }
    const updated = await this._service.update('albums', id, content)
    return updated
  }

  async addPhoto(id, idPhoto) {
    const album = await this._service.getById('albums', id)
    const photo = await this._service.getById('photos', idPhoto)
    if (!album || !photo) return null
    const result = this._service.save('photoalbums', { idPhoto, idAlbum: id })
    return result
  }

  async delete(id) {
    const deleted = await this._service.delete('albums', id)
    return deleted
  }
}

export default AlbumController
