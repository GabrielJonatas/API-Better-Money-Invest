import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInvestDto } from './dto/createInvestDto';
import { ApplyOrWithdraw } from './dto/applyOrWithdrawDto';
import { Invest } from './entitys/invest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Invest) private userRepository: Repository<Invest>,
  ) {}

  async createInvest(data: CreateInvestDto): Promise<string> {
    await this.userRepository.save(data);
    console.log(data);
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
    const invest = await this.userRepository.findOneBy({ id: id });
    if (!invest) {
      throw new NotFoundException('Not found', {
        description: 'Investment not found, make sure the id is correct',
      });
    }
    this.userRepository.delete(invest.id);
    return `This action remove the investment ${id} from the user's wallet`;
  }
}
