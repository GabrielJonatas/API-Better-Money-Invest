import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Invest } from './entitys/invest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entitys/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { Product } from 'src/products/entitys/products.entity';
import { DatabaseService } from 'src/database/database.service';
import { InvestmentService } from './investment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invest, User, Product])],
  controllers: [UserController],
  providers: [UserService, AuthService, DatabaseService, InvestmentService],
})
export class UserModule {}
