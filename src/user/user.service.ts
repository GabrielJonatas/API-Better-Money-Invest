import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplyOrWithdraw } from './dto/applyOrWithdraw.dto';
import { Repository } from 'typeorm';
import { UserDto } from './dto/createUser.dto';
import { User } from './entitys/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
    private databaseService: DatabaseService,
  ) {}

  async loginUser(data: UserDto) {
    const user = await this.databaseService.find<User>(
      { username: data.username },
      this.userRepository,
    );
    if (user == null) {
      throw new NotFoundException('Not found', {
        description: 'Please check your credentials',
      });
    }
    const token = await this.authService.signIn(
      data.password,
      user.password,
      user.id,
      user.username,
      'user',
    );
    return token;
  }

  async registerUser(data: UserDto): Promise<string> {
    const user = await this.databaseService.find<User>(
      { username: data.username },
      this.userRepository,
    );
    if (user != null) {
      throw new BadRequestException('Already registered', {
        description: 'Please, try to login',
      });
    }
    const newUser = data;
    const hash = await this.authService.hashGen(newUser.password);
    newUser.password = hash;
    await this.userRepository.save(newUser);
    return 'This action adds a new user';
  }

  async accountResource(data: ApplyOrWithdraw): Promise<string> {
    console.log(data);
    return `This operation apply or withdraw money from account`;
  }
}
