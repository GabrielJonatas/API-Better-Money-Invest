import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async hashGen(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hash(password, salt);
  }

  async signIn(
    password: string,
    hash: string,
    id: number,
    username: string,
    role: string,
  ) {
    if (!(await bcrypt.compare(password, hash))) {
      throw new UnauthorizedException("Password isn't correct.");
    }
    const payload = { sub: id, username: username, role: role };
    try {
      const genToken = await this.jwtService.signAsync(payload);
      return {
        access_token: genToken,
      };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
