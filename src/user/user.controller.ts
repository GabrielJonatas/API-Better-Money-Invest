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
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private investmentService: InvestmentService,
    private productsService: ProductsService,
  ) {}

  /**
   * Register a new user in the broker system.
   * JWT not required.
   * All users can call this method.
   */
  @ApiBody({
    type: UserDto,
    description: 'The new user data',
  })
  @ApiResponse({
    status: 201,
    description: 'Client successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Client already created',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Public()
  @Post('register')
  async register(@Body() body: UserDto): Promise<void> {
    return await this.userService.registerUser(body);
  }

  /**
   * Log in an user in the broker system.
   * JWT not required.
   * All users can call this method.
   */
  @ApiBody({
    type: UserDto,
    description: 'User data',
  })
  @ApiResponse({
    status: 201,
    description: 'Client successfully logged',
  })
  @ApiResponse({
    status: 404,
    description: 'Client not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Public()
  @Post('login')
  async login(@Body() body: UserDto) {
    return await this.userService.loginUser(body);
  }

  /**
   * Deposit or withdraw money in client's account.
   * JWT required.
   * Only authenticated users of the type client can call this method.
   */
  @ApiBody({
    type: ApplyOrWithdrawDto,
    description: 'Type of the operation and the amount',
  })
  @ApiResponse({
    status: 200,
    description: 'Succesfull operation',
  })
  @ApiResponse({
    status: 400,
    description: 'Withdraw failed',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiBearerAuth()
  @Put()
  @Roles('user')
  async resources(
    @Body() body: ApplyOrWithdrawDto,
    @JwtPayload() payload: PayloadDto,
  ) {
    await this.userService.accountResource(body, payload);
  }

  /**
   * Get information about user's account.
   * JWT required.
   * Only authenticated users of the type client can call this method.
   */
  @ApiResponse({
    status: 200,
    description: 'User information retrieved',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiBearerAuth()
  @Get()
  @Roles('user')
  async getUser(@JwtPayload() payload: PayloadDto) {
    return await this.userService.getUser(payload);
  }

  /**
   * Create a new investment in the user's account.
   * JWT required.
   * Only authenticated users of the type client can call this method.
   */
  @ApiBody({
    type: CreateInvestDto,
    description: 'Type of the operation and the amount',
  })
  @ApiResponse({
    status: 201,
    description: 'Succesfull operation',
  })
  @ApiResponse({
    status: 400,
    description: 'Withdraw failed',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiBearerAuth()
  @Post('investment')
  @Roles('user')
  async invest(
    @Body() body: CreateInvestDto,
    @JwtPayload() payload: PayloadDto,
  ): Promise<void> {
    return await this.investmentService.createInvest(body, payload);
  }

  /**
   * Get a list of all investment products of the broker.
   * JWT not required.
   * All users can call this method.
   */
  @ApiResponse({
    status: 200,
    description: 'List of products retrieved',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiBearerAuth()
  @Get('products')
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }

  /**
   * Get all the user investments.
   * JWT required.
   * Only authenticated users of the type client can call this method.
   */
  @ApiResponse({
    status: 200,
    description: 'List of investments retrieved',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiBearerAuth()
  @Get('investment')
  @Roles('user')
  async wallet(@JwtPayload() payload: PayloadDto) {
    return await this.investmentService.getAllInvests(payload);
  }

  /**
   * Get a investment product that matches the given ID.
   * JWT required.
   * Only authenticated users of the type client can call this method.
   */
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the investment product',
  })
  @ApiResponse({
    status: 200,
    description: 'Product retrieved',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiBearerAuth()
  @Get('investment/:id')
  @Roles('user')
  async product(@Param('id') id: number, @JwtPayload() payload: PayloadDto) {
    return await this.investmentService.getInvest(id, payload);
  }

  /**
   * Delete a investment product that matches the given ID.
   * JWT required.
   * Only authenticated users of the type client can call this method.
   */
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the investment product',
  })
  @ApiResponse({
    status: 200,
    description: 'Product deleted',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiBearerAuth()
  @Delete('investment/:id')
  @Roles('user')
  async removeInvest(
    @Param('id') id: number,
    @JwtPayload() payload: PayloadDto,
  ) {
    return await this.investmentService.removeInvest(id, payload);
  }
}
