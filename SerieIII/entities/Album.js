class Album {
  constructor({ name, description, idOwner }) {
    this._name = name
    this._description = description
    this._idOwner = idOwner
    this._id = null
  }

  get name() {
    return this._name
  }

  get description() {
    return this._description
  }

  get idOwner() {
    return this._idOwner
  }

  get id() {
    return this._id
  }
}

export default Album
