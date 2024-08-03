import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInvestDto } from './dto/createInvest.dto';
import { ApplyOrWithdraw } from './dto/applyOrWithdraw.dto';
import { Invest } from './entitys/invest.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/createUser.dto';
import { User } from './entitys/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { PayloadDto } from 'src/dto/jwt.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Invest) private investRepository: Repository<Invest>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async findUser(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    return user;
  }

  async loginUser(data: UserDto) {
    const user = await this.findUser(data.username);
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
    const user = data;
    if (await this.findUser(user.username)) {
      throw new BadRequestException('Already registered', {
        description: 'Please, try to login',
      });
    }
    const hash = await this.authService.hashGen(user.password);
    user.password = hash;
    await this.userRepository.save(user);
    return 'This action adds a new user';
  }

  async createInvest(
    data: CreateInvestDto,
    payload: PayloadDto,
  ): Promise<string> {
    const user = await this.userRepository.findOne({
      where: {
        id: payload.sub,
      },
    });
    if (user == null) {
      throw new BadRequestException('Exceptional error', {
        description: 'Please, contact customer service',
      });
    }
    const price = 154.05;
    await this.investRepository.save({ user, price, ...data });
    console.log({ user, ...data });
    return 'This action adds a new investment';
  }

  async getAllInvests(): Promise<string> {
    return 'This action return your wallet';
  }

  async getInvest(id: number) {
    return `This action return the #${id} product`;
  }

  async accountResource(data: ApplyOrWithdraw): Promise<string> {
    console.log(data);
    return `This operation apply or withdraw money from account`;
  }

  async removeInvest(id: number): Promise<string> {
    const invest = await this.investRepository.findOneBy({ id: id });
    if (!invest) {
      throw new NotFoundException('Not found', {
        description: 'Investment not found, make sure the id is correct',
      });
    }
    this.investRepository.delete(invest.id);
    return `This action remove the investment ${id} from the user's wallet`;
  }
}
