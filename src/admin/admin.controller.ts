import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateClientDto } from './dto/updateClientsDto';
import { AdminDto } from './dto/createAdminDto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async clients() {
    return await this.adminService.allClients();
  }

  @Patch('id')
  async clientsData(@Param('id') id: number, @Body() client: UpdateClientDto) {
    return await this.adminService.updateClient(id, client);
  }

  @Post('register')
  async registerAdmin(@Body() data: AdminDto) {
    return await this.adminService.registerAdmin(data);
  }

  @Post('login')
  async loginAdmin(@Body() data: AdminDto) {
    return await this.adminService.loginAdmin(data);
  }
  // @Delete('id')
  // async removeClient(@Param('id') id: number) {
  //   return await this.adminService.deleteClient(id);
  // }
}
