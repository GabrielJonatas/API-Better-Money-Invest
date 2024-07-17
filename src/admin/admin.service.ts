import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateClientDto } from './dto/updateClientsDto';
import { AdminDto } from './dto/createAdminDto';
import { Admin } from './entitys/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  async registerAdmin(admin: AdminDto) {
    await this.adminRepository.save(admin);
    return `This action register an admin`;
  }

  async loginAdmin(data: AdminDto) {
    const admin = await this.adminRepository.findOne({
      where: {
        username: data.username,
        password: data.password,
      },
    });
    if (admin == null) {
      throw new NotFoundException('Not found', {
        description: 'Admin not found, please check your credentials',
      });
    }
    return `This action login as an admin`;
  }

  async allClients(): Promise<string> {
    return 'This action list all the clients of the exchange';
  }

  async updateClient(id: number, client: UpdateClientDto): Promise<string> {
    console.log(client);
    return `This action modify the ${id} client`;
  }
}
