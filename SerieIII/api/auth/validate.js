import { body } from 'express-validator'
import { resultHandler } from '../middlewares/handler.js'

export const validateSignin = [
  body('email').exists().withMessage('Expected: username'),
  body('password').exists().withMessage('Expected: password'),
  resultHandler
]
