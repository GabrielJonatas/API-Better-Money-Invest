import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int' })
  assets: number;

  @Column({ type: 'datetime' })
  buyDate: Date;

  @Column({ type: 'float' })
  amountInvested: number;
}
