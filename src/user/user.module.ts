import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Invest } from './entitys/invest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Invest])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
