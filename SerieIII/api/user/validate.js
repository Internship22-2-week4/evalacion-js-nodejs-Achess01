import { body } from 'express-validator'
import PasswordValidator from 'password-validator'
import { resultHandler } from '../middlewares/handler.js'

const schema = new PasswordValidator()
schema
  .is()
  .min(9)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(1)
  .has()
  .symbols(1)

export const validateCreate = [
  body('username')
    .exists()
    .withMessage('Expected: username')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Name should be at least 3 characters'),
  body('email')
    .exists()
    .withMessage('Expected: email')
    .bail()
    .isEmail()
    .withMessage('Wrong email format'),
  body('password')
    .exists()
    .withMessage('Expected: password')
    .bail()
    .custom((value, { req }) => schema.validate(req.body.password))
    .withMessage(
      'Password must be at least 9 characters, must have at least 1 uppercase letter, one number and one symbol'
    ),
  resultHandler
]

export const validateUpdate = [
  body('username')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Name should be at least 3 characters'),
  body('email').optional().isEmail().withMessage('Wrong email format'),
  body('password')
    .optional()
    .custom((value, { req }) => schema.validate(req.body.password))
    .withMessage(
      'Password must be at least 9 characters, must have at least 1 uppercase letter, one number and one symbol'
    ),
  resultHandler
]
