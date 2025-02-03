import prisma from '../prisma/client';

export class UserService {
  public static async getAllUsers() {
    return await prisma.user.findMany();
  };
};