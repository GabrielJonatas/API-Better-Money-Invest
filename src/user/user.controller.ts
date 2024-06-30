import { Controller, Param, Get, Patch, Post } from '@nestjs/common';
//import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Post()
  invest(): string {
    return 'This action adds a new investment';
  }

  @Patch()
  withdraw(): string {
    return 'This action makes a withdraw operatin';
  }

  @Get()
  wallet(): string {
    return 'This action return your wallet';
  }

  @Get(':id')
  product(@Param('id') id: number): string {
    return `This action return the #${id} product`;
  }
}
