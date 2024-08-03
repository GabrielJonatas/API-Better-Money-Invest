import {
  Controller,
  Param,
  Get,
  Put,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { CreateInvestDto } from './dto/createInvest.dto';
import { ApplyOrWithdraw } from './dto/applyOrWithdraw.dto';
import { UserService } from './user.service';
import { UserDto } from './dto/createUser.dto';
import { Public } from 'src/auth/decorators/skipAuth.decorator';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtPayload } from 'src/decorators/handler';
import { PayloadDto } from 'src/dto/jwt.dto';
//import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post('register')
  async register(@Body() body: UserDto): Promise<string> {
    return await this.userService.registerUser(body);
  }

  @Public()
  @Post('login')
  async login(@Body() body: UserDto) {
    return await this.userService.loginUser(body);
  }

  @Post()
  @Roles('user')
  async invest(
    @Body() body: CreateInvestDto,
    @JwtPayload() payload: PayloadDto,
  ): Promise<string> {
    return await this.userService.createInvest(body, payload);
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
