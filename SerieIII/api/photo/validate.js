import { body } from 'express-validator'
import { resultHandler } from '../middlewares/handler.js'

export const validateCreate = [
  body('name')
    .exists()
    .withMessage('Expected: name')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Name should be at least 3 characters'),
  body('uri')
    .exists()
    .withMessage('Expected: uri')
    .bail()
    .isURL()
    .withMessage('Wrong uri format'),
  body('tags').optional().isArray().withMessage('Wrong tags format'),
  resultHandler
]

export const validateUpdate = [
  body('name')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Name should be at least 3 characters'),
  body('uri').optional().isURL().withMessage('Wrong uri format'),
  body('tags').optional().isArray().withMessage('Wrong tags format'),
  resultHandler
]
