import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entitys/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from 'src/database/database.service';
import { LogService } from 'src/logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService, DatabaseService, LogService],
})
export class ProductsModule {}
