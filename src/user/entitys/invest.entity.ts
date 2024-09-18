import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Product } from 'src/products/entitys/products.entity';

@Entity()
export class Invest {
  /**
   * Unique ID of the investment
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Product related to the investment
   */
  @ManyToOne(() => Product, (product) => product.investments)
  product: Product;

  /**
   * Number of assets bought
   */
  @Column({ type: 'int' })
  assets: number;

  /**
   * Relation to the user that adquired the investment
   */
  @ManyToOne(() => User, (user) => user.investments)
  user: User;
}
