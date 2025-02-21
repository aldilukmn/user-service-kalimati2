import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { validateToken } from '../utils/valid-token';
import { UserRepository } from '../repositories/user.repository';
import { User } from '@prisma/client';
import DecodedType from './type';
import { defaultResponse } from '../utils/default-response';

export default class UserMiddleware {
  public static verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token: string | undefined = req.cookies.auth_token;
      const getToken = validateToken(token);
      const decoded = jwt.verify(getToken, `${process.env.SECRET_KEY}`) as DecodedType;
      const user = await UserRepository.findByUsername(decoded.user) as User;
      const isUser: boolean = user.username === decoded.user;
      if (!isUser) {
        throw new Error('user not found!');
      } 
      next();
    } catch (e) {
      if (e instanceof Error) {
        const response = defaultResponse(401, 'fail', e.message);
        res.status(401).json(response);
      };
    };
  };

  public static isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token: string | undefined = req.headers.authorization;
      const getToken = validateToken(token);
      const decoded = jwt.verify(getToken, `${process.env.SECRET_KEY}`) as DecodedType;
      const user = await UserRepository.findByUsername(decoded.user) as User;
      const isAdmin: boolean = user.role === decoded.role;
      if (!isAdmin) {
        throw new Error('it\'s not admin!');
      }
      next();
    } catch (e) {
      if (e instanceof Error) {
        const response = defaultResponse(401, 'fail', e.message);
        res.status(401).json(response);
      };
    };
  };
}