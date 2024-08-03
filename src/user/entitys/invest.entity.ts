import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Invest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  investmentType: string;

  @Column({ type: 'int' })
  assets: number;

  @Column({ type: 'float' })
  price: number;

  @ManyToOne(() => User, (user) => user.investments)
  user: User;
}
