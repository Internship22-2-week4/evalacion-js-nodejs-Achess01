class PhotoController {
  constructor({ service, entity, hashPassword }) {
    this._service = service
    this._entity = entity
    this._hashPassword = hashPassword
  }

  async create(photo) {
    const newPhoto = new this._entity(photo)
    const { name, uri, addedAt, tags, idOwner } = newPhoto
    const response = await this._service.save('photos', {
      name,
      uri,
      addedAt,
      tags,
      idOwner
    })
    return response
  }

  async getAll() {
    const photos = await this._service.getAll('photos')
    return photos
  }

  async getOne(id, query) {
    const photo = await this._service.getById('photos', id)
    return photo
  }

  async update(id, content) {
    const { password } = content
    if (password) {
      const newPass = this._hashPassword(password)
      content.password = newPass
    }
    const updated = await this._service.update('photos', id, content)
    return updated
  }

  async delete(id) {
    const deleted = await this._service.delete('photos', id)
    return deleted
  }
}

export default PhotoController
