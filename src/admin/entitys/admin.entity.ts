import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  /**
   * Admin unique ID
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Admin username
   */
  @Column()
  username: string;

  /**
   * Admin password
   */
  @Column()
  password: string;
}
