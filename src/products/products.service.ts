import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entitys/products.entity';
import { Repository } from 'typeorm';
import { products } from './data/product.data';
import { DatabaseService } from 'src/database/database.service';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService implements OnModuleInit {
  private products = products;

  constructor(
    @InjectRepository(Product) private database: Repository<Product>,
    private databaseService: DatabaseService,
  ) {}
  async onModuleInit() {
    await this.injectProducts();
  }

  private async injectProducts() {
    for (const product of this.products) {
      const newProduct = await this.database.findOne({
        where: { name: product.name },
      });
      if (!newProduct) {
        await this.database.save(product);
      }
    }
  }

  async getAllProducts() {
    const products = await this.databaseService.findAll(this.database);
    return products;
  }

  async insertProduct(product: ProductDto) {
    const registeredProduct = await this.databaseService.find(
      { name: product.name, symbol: product.symbol },
      this.database,
    );
    console.log(registeredProduct);
    if (registeredProduct != null) {
      throw new BadRequestException('Already registered', {
        description: 'The product is already in database',
      });
    }
    await this.databaseService.saveEntity(product, this.database);
  }
}
