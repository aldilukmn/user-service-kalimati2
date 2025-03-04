import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import UserRequest from '../models/dto/user-request';
import { defaultResponse } from '../utils/default-response';

export class UserController {
  // public static async getUsers(req: Request, res: Response) {
  //   try {
  //     const users = await UserService.getAllUsers();
  //     res.status(200).json(users);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       res.status(500).json({
  //         error: error.message
  //       });
  //     };
  //   };
  // };

  public static async createUser(req: Request, res: Response) {
    const isPict: string = req.file?.path!;
    const typePict: string = req.file?.mimetype!;
    const payload: UserRequest  = req.body;
    try {
      const newUser = await UserService.createUser(payload, isPict, typePict);
      const response = defaultResponse(201, 'success', 'user successfully created', newUser);
      res.status(201).json(response);
    } catch (e) {
      if (e instanceof Error) {
        const response = defaultResponse(400, 'fail', e.message);
        res.status(400).json(response);
      };
    };
  };

  public static async loginUser(req: Request, res: Response) {
    const payload: UserRequest = req.body;
    try {
      const result = await UserService.loginUser(payload);
      const response = defaultResponse(200, 'success', 'user has found', result);
      res.cookie(`${process.env.COOKIE_NAME}`, `Bearer ${result.token}`, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none', //with secure is active,
        // domain: "vercel.app",
        path: '/',
        domain: 'uptdsdn2kalimati.vercel.app'
      }).status(200).json(response);
    } catch (e) {
      if (e instanceof Error) {
        const response = defaultResponse(400, 'fail', e.message);
        res.status(400).json(response);
      };
    };
  }

  public static async logoutUser(req: Request, res: Response) {
    try {
      const response = defaultResponse(200, 'success', 'user successfully logout');
      res.clearCookie(`${process.env.COOKIE_NAME}` as string, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none', //with secure is active,
        // domain: "vercel.app",
        path: '/',
        domain: 'uptdsdn2kalimati.vercel.app'
      }).status(200).json(response);
    } catch (e) {
      if (e instanceof Error) {
        const response = defaultResponse(400, 'fail', e.message);
        res.status(400).json(response);
      }
    }
  }
};