import { Invest } from 'src/user/entitys/invest.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  /**
   * Product unique ID
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Product name
   */
  @Column()
  name: string;

  /**
   * Product type: bond or share
   */
  @Column()
  type: string;

  /**
   * Product symbol representation
   */
  @Column()
  symbol: string;

  /**
   * Product price
   */
  @Column({ type: 'decimal', precision: 3, scale: 2 })
  price: number;

  /**
   * Product return of the investment (ROI)
   */
  @Column({ type: 'decimal', precision: 3, scale: 2 })
  roi: number;

  /**
   * Relation to investment wallet
   */
  @OneToMany(() => Invest, (investment) => investment.user)
  investments: Invest[];
}
