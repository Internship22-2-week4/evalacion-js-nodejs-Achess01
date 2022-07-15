import AlbumController from './Controller.js'
import AlbumRouter from './Router.js'
import { response } from '../../response/response.js'
import { HttpStatusCode } from '../../response/httpCode.js'
import Album from '../../entities/Album.js'
import MongoService from '../../store/MongoService.js'
import { validateCreate, validateUpdate, validateAddPhoto } from './validate.js'
import { checkToken } from '../middlewares/handler.js'

const albumModule = (router) => {
  const serviceAlbum = new MongoService()
  const albumController = new AlbumController({
    service: serviceAlbum,
    entity: Album
  })

  const albumRouter = new AlbumRouter({
    router,
    controller: albumController,
    response,
    httpCode: HttpStatusCode,
    validateCreate,
    validateUpdate,
    validateAddPhoto,
    checkToken
  })

  return albumRouter._router
}

export default albumModule
