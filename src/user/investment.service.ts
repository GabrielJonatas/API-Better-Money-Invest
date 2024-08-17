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
import { UserService } from './user.service';
import { ApplyOrWithdrawDto } from './dto/applyOrWithdraw.dto';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(Invest) private investRepository: Repository<Invest>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private databaseService: DatabaseService,
    private userService: UserService,
  ) {}

  async createInvest(
    data: CreateInvestDto,
    payload: PayloadDto,
  ): Promise<string> {
    const user = await this.databaseService.find<User>(
      { id: payload.sub },
      this.userRepository,
    );
    const product = await this.databaseService.find<Product>(
      { name: data.name, type: data.investmentType },
      this.productRepository,
    );
    if (user == null || product == null) {
      throw new BadRequestException('Exceptional error', {
        description: 'Please, contact customer service',
      });
    }
    const assets = data.assets;
    if (user.resources < product.price * assets) {
      throw new BadRequestException('Invalid transaction', {
        description: 'You don"t have enough resources',
      });
    }
    const debit = product.price * assets;
    const remove = {
      amount: debit,
      operation: 'withdraw',
    } as ApplyOrWithdrawDto;
    await this.userService.accountResource(remove, payload);
    await this.investRepository.save({ product, assets, user });
    return 'This action adds a new investment';
  }

  async getAllInvests(payload: PayloadDto) {
    const listInvestments = [];
    const investments = await this.databaseService.findRelations(
      this.investRepository,
      { product: true },
      { user: { id: payload.sub } },
    );
    for (const investment of investments) {
      listInvestments.push({
        ...investment.product,
        id: investment.id,
        assets: investment.assets,
      });
    }
    return listInvestments;
  }

  async getInvest(id: number, payload: PayloadDto) {
    const investments = await this.databaseService.findRelations(
      this.investRepository,
      { product: true },
      { user: { id: payload.sub } },
    );
    for (const investment of investments) {
      if (investment.id == id) {
        return {
          ...investment.product,
          id: investment.id,
          assets: investment.assets,
        };
      }
    }
  }

  async removeInvest(id: number, payload: PayloadDto): Promise<string> {
    const investment = await this.getInvest(id, payload);
    if (!investment) {
      throw new NotFoundException('Investment not found', {
        description: 'Check if the id is correct, and try again',
      });
    }
    const income = investment.price * (1 + investment.roi) * investment.assets;
    const apply = {
      amount: income,
      operation: 'deposit',
    } as ApplyOrWithdrawDto;
    await this.userService.accountResource(apply, payload);
    const investmentEntity = await this.databaseService.find(
      { id: id },
      this.investRepository,
    );
    await this.databaseService.deleteEntity(
      investmentEntity,
      this.investRepository,
    );
    return 'Everythings got right';
  }
}
