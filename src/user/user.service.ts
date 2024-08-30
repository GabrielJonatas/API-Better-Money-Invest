import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplyOrWithdrawDto } from './dto/applyOrWithdraw.dto';
import { Repository } from 'typeorm';
import { UserDto } from './dto/createUser.dto';
import { User } from './entitys/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from 'src/database/database.service';
import { PayloadDto } from 'src/dto/jwt.dto';

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
    if (user === null) {
      throw new NotFoundException('Not Found, please check your credentials');
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

  async registerUser(data: UserDto): Promise<void> {
    const user = await this.databaseService.find<User>(
      { username: data.username },
      this.userRepository,
    );
    if (user != null) {
      throw new BadRequestException('Already registered, please try to log in');
    }
    const newUser = data;
    const hash = await this.authService.hashGen(newUser.password);
    newUser.password = hash;
    const userEntity = { ...newUser, resources: 0 };
    await this.databaseService.saveEntity(userEntity, this.userRepository);
  }

  async accountResource(data: ApplyOrWithdrawDto, payload: PayloadDto) {
    const user = await this.databaseService.find(
      { id: payload.sub },
      this.userRepository,
    );
    let userResources = user.resources;
    if (data.operation === 'withdraw') {
      if (userResources >= data.amount) {
        userResources -= data.amount;
      } else {
        throw new BadRequestException(
          'You cant withdraw, because the requested amount is greater than you account resources',
        );
      }
    } else if (data.operation === 'deposit') {
      userResources += data.amount;
    }
    await this.databaseService.updateEntity(
      { id: user.id },
      { resources: userResources },
      this.userRepository,
    );
  }

  async getUser(payload: PayloadDto) {
    const user = await this.databaseService.find(
      { id: payload.sub },
      this.userRepository,
    );
    return { username: user.username, resources: user.resources };
  }
}
