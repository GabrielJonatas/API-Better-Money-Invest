import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Invest } from './invest.entity';

@Entity()
export class User {
  /**
   * Unique ID of the client
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Username of the client
   */
  @Column({ unique: true })
  username: string;

  /**
   * Password of the cleint
   */
  @Column()
  password: string;

  /**
   * Resources of the client
   */
  @Column()
  resources: number;

  /**
   * List of investments of the client
   */
  @OneToMany(() => Invest, (investment) => investment.user)
  investments: Invest[];
}
