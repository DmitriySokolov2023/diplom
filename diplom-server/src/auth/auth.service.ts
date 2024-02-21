import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.findByCond({
      login,
      password,
    });
    if (user && user.password === password) {
      const {password,...result } = user;
      return result;
    }
    return null;
  }
}
