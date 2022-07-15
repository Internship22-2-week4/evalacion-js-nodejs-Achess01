import PhotoController from './Controller.js'
import PhotoRouter from './Router.js'
import { response } from '../../response/response.js'
import { HttpStatusCode } from '../../response/httpCode.js'
import Photo from '../../entities/Photo.js'
import MongoService from '../../store/MongoService.js'
import { validateCreate, validateUpdate } from './validate.js'
import { checkToken } from '../middlewares/handler.js'

const photoModule = (router) => {
  const servicePhoto = new MongoService()
  const photoController = new PhotoController({
    service: servicePhoto,
    entity: Photo
  })

  const photoRouter = new PhotoRouter({
    router,
    controller: photoController,
    response,
    httpCode: HttpStatusCode,
    validateCreate,
    validateUpdate,
    checkToken
  })

  return photoRouter._router
}

export default photoModule
