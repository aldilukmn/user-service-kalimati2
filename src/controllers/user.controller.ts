import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  public static async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          error: error.message
        });
      };
    };
  };
};