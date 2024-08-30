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
import { ApplyOrWithdrawDto } from './dto/applyOrWithdraw.dto';
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
  async register(@Body() body: UserDto): Promise<void> {
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
    @Body() body: ApplyOrWithdrawDto,
    @JwtPayload() payload: PayloadDto,
  ) {
    await this.userService.accountResource(body, payload);
  }

  @Get()
  @Roles('user')
  async getUser(@JwtPayload() payload: PayloadDto) {
    return await this.userService.getUser(payload);
  }

  @Post('investment')
  @Roles('user')
  async invest(
    @Body() body: CreateInvestDto,
    @JwtPayload() payload: PayloadDto,
  ): Promise<void> {
    return await this.investmentService.createInvest(body, payload);
  }

  @Get('products')
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }

  @Get('investment')
  @Roles('user')
  async wallet(@JwtPayload() payload: PayloadDto) {
    return await this.investmentService.getAllInvests(payload);
  }

  @Get('investment/:id')
  @Roles('user')
  async product(@Param('id') id: number, @JwtPayload() payload: PayloadDto) {
    return await this.investmentService.getInvest(id, payload);
  }

  @Delete('investment/:id')
  @Roles('user')
  async removeInvest(
    @Param('id') id: number,
    @JwtPayload() payload: PayloadDto,
  ) {
    return await this.investmentService.removeInvest(id, payload);
  }
}
