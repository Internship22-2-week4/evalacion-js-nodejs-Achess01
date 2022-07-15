import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import userModule from './user/index.js'
import authModule from './auth/index.js'

class Server {
  constructor({ port, hostname, name }) {
    this._app = express()
    this._port = port
    this._hostname = hostname
    this._name = name
    this.setMiddlewares()
    this.setRoutes()
  }

  setMiddlewares() {
    this._app.use(express.json())
    this._app.use(express.urlencoded({ extended: true }))
    this._app.use(cors())
    this._app.use(morgan('dev'))
  }

  setRoutes() {
    this._app.get('/', function (req, res) {
      res.send('hello world')
    })
    this._app.use('/api/v1/users', userModule(express.Router))
    this._app.use('/api/v1/auth', authModule(express.Router))
  }

  start() {
    this._app.set('hostname', this._hostname)
    this._app.listen(this._port, () => {
      console.log(
        `${this._name} is running on http://${this._hostname}:${this._port}`
      )
    })
  }
}

export default Server
