import UserController from './Controller.js'
import UserRouter from './Router.js'
import { response } from '../../response/response.js'
import { HttpStatusCode } from '../../response/httpCode.js'
import User from '../../entities/User.js'
import helpers from '../../lib/helpers.js'
import MongoService from '../../store/MongoService.js'
import { validateCreate, validateUpdate } from './validate.js'
import { checkToken } from '../middlewares/handler.js'

const userModule = (router) => {
  const serviceUser = new MongoService()
  const userController = new UserController({
    service: serviceUser,
    entity: User,
    hashPassword: helpers.encryptPassword
  })

  const userRouter = new UserRouter({
    router,
    controller: userController,
    response,
    httpCode: HttpStatusCode,
    validateCreate,
    validateUpdate,
    checkToken
  })

  return userRouter._router
}

export default userModule
