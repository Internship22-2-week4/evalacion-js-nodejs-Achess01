import { body } from 'express-validator'
import { resultHandler } from '../middlewares/handler.js'

export const validateCreate = [
  body('name')
    .exists()
    .withMessage('Expected: name')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Name should be at least 3 characters'),
  body('description')
    .exists()
    .withMessage('Expected: description')
    .bail()
    .isLength({ min: 10 })
    .withMessage('description should be at least 10 characters'),
  resultHandler
]

export const validateUpdate = [
  body('name')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Name should be at least 3 characters'),
  body('description')
    .optional()
    .isLength({ min: 10 })
    .withMessage('description should be at least 10 characters'),
  resultHandler
]

export const validateAddPhoto = [
  body('idPhoto')
    .exists()
    .withMessage('Expected: idPhoto')
    .bail()
    .isLength({ min: 20 })
    .withMessage('Wrong id'),
  resultHandler
]
