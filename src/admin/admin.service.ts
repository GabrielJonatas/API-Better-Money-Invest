import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateClientDto } from './dto/updateClientsDto';
import { AdminDto } from './dto/createAdminDto';
import { Admin } from './entitys/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  async hashGen(password: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hash(password, salt);
  }

  async registerAdmin(admin: AdminDto) {
    const hash = await this.hashGen(admin.password);
    admin.password = hash;
    await this.adminRepository.save(admin);
    return `This action register an admin`;
  }

  async loginAdmin(data: AdminDto) {
    const admin = await this.adminRepository.findOne({
      where: {
        username: data.username,
      },
    });
    if (admin == null) {
      throw new NotFoundException('Not found', {
        description: 'Please check your credentials',
      });
    }
    if (await bcrypt.compare(data.password, admin.password)) {
      return `This action login as an admin`;
    } else {
      throw new UnauthorizedException('Not Authorized', {
        description: 'Please check your credentials',
      });
    }
  }

  async allClients(): Promise<string> {
    return 'This action list all the clients of the exchange';
  }

  async updateClient(id: number, client: UpdateClientDto): Promise<string> {
    console.log(client);
    return `This action modify the ${id} client`;
  }
}
