import { Prisma } from '@prisma/client';
import { User } from '../models/user.model';
import prisma from '../prisma/client';

export class UserRepository {
  public static async create(data: Prisma.UserCreateInput): Promise<User> {
    return await prisma.user.create({ data: data });
  };

  public static async findByUsername(username: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { username }
    });
  };
};