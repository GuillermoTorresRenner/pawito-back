import { Request, Response } from 'express';
import { UserService } from '../services/users.service';
import { UsersCreateDTO } from '../../types/users.dto';
import { InternalServerError, NotFoundError, CustomError } from '../errors/customError';
import { validationResult } from 'express-validator';
import { comparePassword } from '../utils/passwords';
import { generateToken } from '../validations/token';

export class UsersController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
      }
      const user: UsersCreateDTO = req.body;
      const createdUser = await this.userService.createUser(user);
      if (!createdUser) {
        throw new InternalServerError("Error creating user");
      }
      return res.status(201).json(createdUser);
    } catch (error: any) {
      if (error instanceof InternalServerError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      /**
       * Dependiendo del negocio se puede aaplicar una validacion de 
       * 3 intentos fallidos y bloquear la cuenta por un tiempo
       * 
       */
      const { email, password } = req.body;
      const user = await this.userService.getUserByEmail(email);
      if (!user) throw new NotFoundError("User or password incorrect");
      const validPassword = comparePassword(password, user.password);
      if (!validPassword) throw new NotFoundError("User or password incorrect");
      const token = generateToken(user);
      await this.userService.updateLastConnection(user.userID);
      return res.cookie('token', token, { httpOnly: true }).json({ message: "Login successful" });
    } catch (error) {
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async whoami(req: Request, res: Response) {
    try {
   
       const user = await this.userService.getUserById(req.userID||"");
      if (user===null) throw new NotFoundError("User not found");
      return res.json(user);
    } catch (error) {
      if (error instanceof CustomError) {
         res.status(error.statusCode).json({ message: error.message });
        
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async logout(_req: Request, res: Response) {
    try {
      res.clearCookie('token').json({ message: "Logout successful" });
      return res.status(200);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}