import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entitys/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService],
})
export class ProductsModule {}
