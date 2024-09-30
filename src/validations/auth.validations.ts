
import { body } from 'express-validator'

export const ValidationRegisterRules = [
  body('email').notEmpty().withMessage('El email es obligatorio.'),
  body('name').notEmpty().withMessage('El nombre es obligatorio.'),
  body('surname').notEmpty().withMessage('El apellido es obligatorio.'),
  body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
]
export const ValidationLoginRules = [
  body('email').notEmpty().withMessage('El email es obligatorio.'),
  body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
]
