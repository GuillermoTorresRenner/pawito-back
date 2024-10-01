import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/users.service'
import { UsersCreateDTO } from '../../types/users.dto'
import { InternalServerError, NotFoundError, CustomError, UserCreatedError } from '../errors/customError'
import { comparePassword } from '../utils/passwords'
import { generateToken } from '../validations/token'
import passport from '../utils/passport.config'

export class UsersController {
  private readonly userService: UserService

  constructor (userService: UserService) {
    this.userService = userService
  }

  public async register (req: Request, res: Response): Promise<Response> {
    try {
      const user: UsersCreateDTO = req.body
      const isUserRegistered = await this.userService.getUserByEmail(user.email)

      if (isUserRegistered != null) {
        throw new UserCreatedError('User already registered')
      }

      const createdUser = await this.userService.createUser(user)
      if (createdUser == null) throw new InternalServerError('Error creating user')

      return res.status(201).json({ message: 'User created successfully' })
    } catch (error: any) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message })
      }

      return res.status(500).json({ message: 'Internal Server Error', error })
    }
  }

  public async login (req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body
      const user = await this.userService.getUserByEmail(email)
      if (user == null) throw new NotFoundError('User or password incorrect')
      const validPassword = comparePassword(password, user.password)
      if (!validPassword) throw new NotFoundError('User or password incorrect')
      const token = generateToken(user)
      await this.userService.updateLastConnection(user.userID)
      return res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful' })
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  public async whoami (req: Request, res: Response): Promise<Response> {
    try {
      const userID = req.userID ?? ''
      const user = await this.userService.getUserById(userID)
      if (user === null) throw new NotFoundError('User not found')
      return res.json(user)
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async logout (_req: Request, res: Response): Promise<Response> {
    try {
      res.clearCookie('token').json({ message: 'Logout successful' })
      return res.status(200)
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  public googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] })
  public googleCallback = (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate('google', (err: any, user: any, _info: any) => {
      if (err != null) {
        return next(err)
      }
      if (user == null) {
        return res.redirect('/')
      }
      const { token } = user
      res.cookie('jwt', token, { httpOnly: true, secure: true })

      // Manejar el redireccionamiento
      // res.json({ message: 'Authentication successful'});
      res.redirect(process.env.APP_URL as string)
    })(req, res, next)
  }

  public handleGoogleCallback = (req: Request, res: Response): void => {
    const { token } = req.user as any
    res.cookie('jwt', token, { httpOnly: true, secure: true })
    res.redirect('/profile')
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body
      const userID = req.userID ?? ''
      const foundedUser = await this.userService.getUserById(userID)
      if (foundedUser == null) throw new NotFoundError('User not found')
      const updatedUser = await this.userService.updateUser(userID, data)
      if (updatedUser == null) throw new InternalServerError('Error updating user')
      return res.json({ message: 'User updated successfully' })
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Internal Server Error', error })
    }
  }
}
