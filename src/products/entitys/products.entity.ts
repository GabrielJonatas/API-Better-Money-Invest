import { Invest } from 'src/user/entitys/invest.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  symbol: string;

  @Column({ type: 'decimal', precision: 3, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 3, scale: 2 })
  roi: number;

  @OneToMany(() => Invest, (investment) => investment.user)
  investments: Invest[];
}
