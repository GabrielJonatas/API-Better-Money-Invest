import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entitys/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from 'src/database/database.service';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entitys/products.entity';
import { User } from 'src/user/entitys/user.entity';
import { Invest } from 'src/user/entitys/invest.entity';
import { LogService } from 'src/logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Product, User, Invest])],
  controllers: [AdminController],
  providers: [
    AdminService,
    AuthService,
    ProductsService,
    DatabaseService,
    LogService,
  ],
})
export class AdminModule {}
