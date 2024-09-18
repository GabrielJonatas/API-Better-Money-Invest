import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateClientDto } from './dto/updateClients.dto';
import { AdminDto } from './dto/createAdmin.dto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Public } from 'src/auth/decorators/skipAuth.decorator';
import { ProductsService } from 'src/products/products.service';
import { ProductDto } from 'src/products/dto/product.dto';
import { User } from 'src/user/entitys/user.entity';
import { Invest } from 'src/user/entitys/invest.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly productService: ProductsService,
  ) {}

  /**
   * Retrieves a list of all clients associated with the broker
   * JWT required
   * Only authenticated users of the type admin can call this method.
   */
  @ApiResponse({
    status: 200,
    description: 'Clients information retrieved successfully',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiBearerAuth()
  @Get('clients')
  @Roles('admin')
  async clients(): Promise<User[]> {
    return await this.adminService.allClients();
  }

  /**
   * Retrieves a list of all clients associated with the broker and their investments
   * JWT required
   * Only authenticated users of the type admin can call this method.
   */
  @ApiResponse({
    status: 200,
    description: 'Clients and investments information retrieved successfully',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiBearerAuth()
  @Get('investments')
  @Roles('admin')
  async investments(): Promise<Invest[]> {
    return await this.adminService.allInvestments();
  }

  /**
   * Update the information of a specific client.
   * JWT required
   * Only authenticated users of the type admin can call this method.
   */
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the client to update',
  })
  @ApiBody({
    type: UpdateClientDto,
    description: 'The new data for the client',
  })
  @ApiResponse({
    status: 200,
    description: 'Clients informations updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Client not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiBearerAuth()
  @Patch('client/:id')
  @Roles('admin')
  async clientsData(
    @Param('id') id: number,
    @Body() client: UpdateClientDto,
  ): Promise<void> {
    return await this.adminService.updateClient(id, client);
  }

  /**
   * Insert a new product in products database
   * JWT required
   * Only authenticated users of the type admin can call this method.
   */
  @ApiBody({
    type: ProductDto,
    description: 'The new product data',
  })
  @ApiResponse({
    status: 201,
    description: 'Products insertion successfull',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiBearerAuth()
  @Post('insert')
  @Roles('admin')
  async insertProduct(@Body() data: ProductDto): Promise<void> {
    return await this.productService.insertProduct(data);
  }

  /**
   * Register a new admin in the broker system
   * JWT not required
   * All users can call this method.
   */
  @ApiBody({
    type: AdminDto,
    description: 'The new admin data',
  })
  @ApiResponse({
    status: 201,
    description: 'Admin successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Admin already registered',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Public()
  @Post('register')
  async registerAdmin(@Body() data: AdminDto): Promise<void> {
    return await this.adminService.registerAdmin(data);
  }

  /**
   * Admin authentication in the system, if authenticated, it emits a JWT token
   * JWT not required
   * All users can call this method.
   */
  @ApiBody({
    type: AdminDto,
    description: 'Admin user and password data',
  })
  @ApiResponse({
    status: 201,
    description: 'Admin successfully logged',
  })
  @ApiResponse({
    status: 401,
    description: 'Incorrect password',
  })
  @ApiResponse({
    status: 404,
    description: 'Admin not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Public()
  @Post('login')
  async loginAdmin(@Body() data: AdminDto): Promise<{
    access_token: string;
  }> {
    return await this.adminService.loginAdmin(data);
  }
}
