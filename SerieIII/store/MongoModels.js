import mongoose from 'mongoose'

const users = mongoose.model(
  'users',
  new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  })
)

const albums = mongoose.model(
  'albums',
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    idOwner: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  })
)

const photos = mongoose.model(
  'photos',
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    idOwner: {
      type: String,
      required: true
    },
    uri: {
      type: String,
      required: true
    },
    addedAt: {
      type: Date,
      required: true
    },
    tags: {
      type: Array,
      default: [],
      required: true
    }
  })
)

const photoalbums = mongoose.model(
  'photoalbums',
  new mongoose.Schema({
    idPhoto: {
      type: String,
      required: true
    },
    idAlbum: {
      type: String,
      required: true
    }
  })
)

const models = {
  users,
  albums,
  photos,
  photoalbums
}

export default models
