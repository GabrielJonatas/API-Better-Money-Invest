import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Product } from 'src/products/entitys/products.entity';

@Entity()
export class Invest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.investments)
  product: Product;

  @Column({ type: 'int' })
  assets: number;

  @ManyToOne(() => User, (user) => user.investments)
  user: User;
}
