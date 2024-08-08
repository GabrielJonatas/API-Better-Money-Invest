import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateClientDto } from './dto/updateClients.dto';
import { AdminDto } from './dto/createAdmin.dto';
import { JwtPayload } from 'src/decorators/handler';
import { PayloadDto } from 'src/dto/jwt.dto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Public } from 'src/auth/decorators/skipAuth.decorator';
import { ProductsService } from 'src/products/products.service';
import { ProductDto } from 'src/products/dto/product.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly productService: ProductsService,
  ) {}

  @Get()
  @Roles('admin')
  async clients(@JwtPayload() payload: PayloadDto) {
    console.log(payload);
    return await this.adminService.allClients();
  }

  @Patch('id')
  @Roles('admin')
  async clientsData(@Param('id') id: number, @Body() client: UpdateClientDto) {
    return await this.adminService.updateClient(id, client);
  }

  @Public()
  @Post('insert')
  async insertProduct(@Body() data: ProductDto) {
    return await this.productService.insertProduct(data);
  }

  @Public()
  @Post('register')
  async registerAdmin(@Body() data: AdminDto) {
    return await this.adminService.registerAdmin(data);
  }

  @Public()
  @Post('login')
  async loginAdmin(@Body() data: AdminDto) {
    return await this.adminService.loginAdmin(data);
  }
  // @Delete('id')
  // async removeClient(@Param('id') id: number) {
  //   return await this.adminService.deleteClient(id);
  // }
}
