import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Invest } from './invest.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  resources: number;

  @OneToMany(() => Invest, (investment) => investment.user)
  investments: Invest[];
}
