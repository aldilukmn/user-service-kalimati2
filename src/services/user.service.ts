import UserRequest from '../models/dto/user-request';
import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { handleCloudinary } from '../utils/handle-cloudinary';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export class UserService {
  // public static async getAllUsers() {
  //   return await prisma.user.findMany();
  // };

  public static async createUser(data: UserRequest, isPict: string, typePict: string): Promise<User> {
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

  public static async loginUser(payload: Partial<UserRequest>): Promise<{ token: string, username: string }> {
    try {
      const username = payload.username?.trim()!;
      const password = payload.password?.trim()!;

      if (!username || !password || username.length === 0 || password.length === 0) {
        throw new Error(`${!username ? 'username' : 'password'} is required`);
      }
      const getUser = await UserRepository.findByUsername(username);
      if (!getUser || !getUser.username) {
        throw new Error('username doesn\'t exist');
      }
      const passIsCorrect: boolean = await bcrypt.compare(password, getUser.password);
      if (!passIsCorrect) {
        throw new Error('wrong password');
      };
      if (!process.env.SECRET_KEY) {
        throw new Error('secret key is not defined in the environment variable');
      };
      const token = jwt.sign({
        user: username,
        role: getUser.role
      }, process.env.SECRET_KEY, {
        expiresIn: '1h'
      });
      return {
        token,
        username
      }
    } catch (e) {
        if (e instanceof Error)
          throw new Error(e.message);
        throw new Error('an unknow error occured during login');
    };
  };
};