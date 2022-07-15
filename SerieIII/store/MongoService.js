import mongoose from 'mongoose'
import { config } from '../config/defaults.js'
import models from './MongoModels.js'

const mongodb = async () => {
  try {
    const db = await mongoose.connect(config.dbmongo.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(`MongoDB connected: ${db.connection.host}`)
  } catch (error) {
    console.error(error)
  }
}

export default class MongoService {
  constructor() {
    this._models = models
    mongodb()
  }

  // Create
  async save(table, data) {
    try {
      if (!this._models[table]) return null
      const model = models[table]
      const newData = model(data)
      const res = await newData.save()
      return res
    } catch (error) {
      console.error(error)
      return null
    }
  }

  // Request
  async getAll(table, extra, limit = -1) {
    try {
      if (!this._models[table]) return null
      const model = models[table]
      const searchQuery = extra || {}
      let res = null
      if (limit > 0) {
        res = await model.find(searchQuery).limit(limit)
      } else {
        res = await model.find(searchQuery)
      }
      return res
    } catch (err) {
      // console.error(err)
      return null
    }
  }

  async getById(table, id) {
    try {
      if (!this._models[table]) return null
      const model = this._models[table]
      const res = await model.findById(id)
      return res
    } catch {
      return null
    }
  }

  async getByAttribute(table, attribute, value) {
    try {
      if (!this._models[table]) return null
      const model = this._models[table]
      const queryObj = {}
      queryObj[attribute] = value
      const res = await model.findOne(queryObj)
      return res
    } catch {
      return null
    }
  }

  // Update
  async update(table, id, data) {
    try {
      if (!this._models[table]) return null
      const model = this._models[table]
      const res = await model.findByIdAndUpdate(id, data)
      return res
    } catch {
      return null
    }
  }

  // Delete

  async delete(table, id) {
    try {
      if (!this._models[table]) return null
      const model = this._models[table]
      const res = await model.findByIdAndDelete(id)
      return res
    } catch {
      return null
    }
  }
}
