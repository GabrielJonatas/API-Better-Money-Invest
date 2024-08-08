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
import { InvestmentService } from './investment.service';
import { ProductsService } from 'src/products/products.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private investmentService: InvestmentService,
    private productsService: ProductsService,
  ) {}

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

  @Put()
  @Roles('user')
  async resources(
    @Body() body: ApplyOrWithdraw,
    @JwtPayload() payload: PayloadDto,
  ): Promise<string> {
    return await this.userService.accountResource(body, payload);
  }

  @Post()
  @Roles('user')
  async invest(
    @Body() body: CreateInvestDto,
    @JwtPayload() payload: PayloadDto,
  ): Promise<string> {
    return await this.investmentService.createInvest(body, payload);
  }

  @Get('products')
  @Roles('user')
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }

  @Get()
  @Roles('user')
  async wallet(): Promise<string> {
    return await this.investmentService.getAllInvests();
  }

  @Get(':id')
  @Roles('user')
  async product(@Param('id') id: number): Promise<string> {
    return await this.investmentService.getInvest(id);
  }

  @Delete(':id')
  @Roles('user')
  async removeInvest(@Param('id') id: number): Promise<string> {
    return await this.investmentService.removeInvest(id);
  }
}
