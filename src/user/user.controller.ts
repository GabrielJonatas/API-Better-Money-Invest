import {
  Controller,
  Param,
  Get,
  Put,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { CreateInvestDto } from './dto/createInvestDto';
import { ApplyOrWithdraw } from './dto/applyOrWithdrawDto';
import { UserService } from './user.service';
//import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async invest(@Body() body: CreateInvestDto): Promise<string> {
    return await this.userService.createInvest(body);
  }

  @Put()
  async resources(@Body() body: ApplyOrWithdraw): Promise<string> {
    return await this.userService.accountResource(body);
  }

  @Get()
  async wallet(): Promise<string> {
    return await this.userService.getAllInvests();
  }

  @Get(':id')
  async product(@Param('id') id: number): Promise<string> {
    return await this.userService.getInvest(id);
  }

  @Delete(':id')
  async removeInvest(@Param('id') id: number): Promise<string> {
    return await this.userService.removeInvest(id);
  }
}
