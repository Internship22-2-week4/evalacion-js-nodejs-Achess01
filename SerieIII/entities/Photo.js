class Photo {
  constructor({ name, idOwner, uri, addedAt, tags = [] }) {
    this._idOwner = idOwner
    this._name = name
    this._uri = uri
    this._addedAt = addedAt
    this._tags = tags
    this._id = null
  }

  get name() {
    return this._name
  }

  get idOwner() {
    return this._idOwner
  }

  get uri() {
    return this._uri
  }

  get addedAt() {
    return this._addedAt
  }

  get tags() {
    return this._tags
  }
}

export default Photo
