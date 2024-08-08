import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entitys/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from 'src/database/database.service';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entitys/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Product])],
  controllers: [AdminController],
  providers: [AdminService, AuthService, ProductsService, DatabaseService],
})
export class AdminModule {}
