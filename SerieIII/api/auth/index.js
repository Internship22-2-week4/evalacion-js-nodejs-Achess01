import Auth from '../../entities/Auth.js'
import AuthRoute from './Routes.js'
import AuthController from './Controller.js'
import MongoService from '../../store/MongoService.js'
import helpers from '../../lib/helpers.js'
import { response } from '../../response/response.js'
import { HttpStatusCode } from '../../response/httpCode.js'

const authModule = (router) => {
  const authServices = new MongoService()
  const authController = new AuthController({
    services: authServices,
    entity: Auth,
    comparePassword: helpers.comparePassword,
    generateToken: helpers.generateToken
  })
  const authRoute = new AuthRoute({
    router,
    controller: authController,
    response,
    httpCode: HttpStatusCode
  })

  return authRoute._router
}

export default authModule
