import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entitys/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService, DatabaseService],
})
export class ProductsModule {}
