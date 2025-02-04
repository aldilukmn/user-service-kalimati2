import UserRequest from '../models/dto/user-request';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { handleCloudinary } from '../utils/handle-cloudinary';
import bcrypt from 'bcrypt';

export class UserService {
  // public static async getAllUsers() {
  //   return await prisma.user.findMany();
  // };

  public static async createUser(data: Partial<UserRequest>, isPict: string, typePict: string): Promise<User> {
    const { username, password, email, role, picture_url, picture_id } = data
    if (!username || !password || !email) {
      throw new Error(`please enter ${!username ? 'username' : !password ? 'password' : !email ? 'email' : null}`);
    };
    if (password.length < 8) {
      throw new Error('password length should be more than 8 characters');
    };
    if (!email.includes('@')) {
      throw new Error('not email format');
    };
    if (
        typePict !== 'image/png' &&
        typePict !== 'image/jpg' &&
        typePict !== 'image/jpeg'
      ) {
      throw new Error('it\'s not image format');
    };
    const existingUser = await UserRepository.findByUsername(username);
    if (existingUser) {
      throw new Error('username already exists');
    };
    const getPict = await handleCloudinary(isPict, 'user');
    const salt = await bcrypt.genSalt();
    const hashing = await bcrypt.hash(password, salt);
    return await UserRepository.create({
      username,
      password: hashing,
      email,
      role: 'admin',
      picture_url: getPict.secure_url,
      picture_id: getPict.public_id,
    });
  };
};