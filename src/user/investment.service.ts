import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entitys/user.entity';
import { DatabaseService } from 'src/database/database.service';
import { Invest } from './entitys/invest.entity';
import { Product } from 'src/products/entitys/products.entity';
import { CreateInvestDto } from './dto/createInvest.dto';
import { PayloadDto } from 'src/dto/jwt.dto';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(Invest) private investRepository: Repository<Invest>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private databaseService: DatabaseService,
  ) {}

  async createInvest(
    data: CreateInvestDto,
    payload: PayloadDto,
  ): Promise<string> {
    const user = await this.databaseService.find<User>(
      { id: payload.sub },
      this.userRepository,
    );
    if (user == null) {
      throw new BadRequestException('Exceptional error', {
        description: 'Please, contact customer service',
      });
    }
    const product = await this.databaseService.find<Product>(
      { name: data.name, type: data.investmentType },
      this.productRepository,
    );
    if (product == null) {
      throw new BadRequestException('Exceptional error', {
        description: 'Please, contact customer service',
      });
    }
    const assets = data.assets;
    await this.investRepository.save({ product, assets, user });
    return 'This action adds a new investment';
  }

  async getAllInvests(): Promise<string> {
    return 'This action return your wallet';
  }

  async getInvest(id: number) {
    return `This action return the #${id} product`;
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
