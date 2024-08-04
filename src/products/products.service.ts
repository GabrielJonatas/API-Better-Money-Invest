import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entitys/products.entity';
import { Repository } from 'typeorm';
import { products } from './data/product.data';

@Injectable()
export class ProductsService implements OnModuleInit {
  private products = products;

  constructor(
    @InjectRepository(Product) private database: Repository<Product>,
  ) {}
  async onModuleInit() {
    await this.injectProducts();
  }

  async injectProducts() {
    for (const product of this.products) {
      try {
        const newProduct = await this.database.findOne({
          where: { name: product.name },
        });
        if (!newProduct) {
          await this.database.save(product);
        }
      } catch {
        throw new BadRequestException('Error at products creation', {
          description: 'Cannot register product in database',
        });
      }
    }
  }
}
