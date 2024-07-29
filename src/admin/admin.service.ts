import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateClientDto } from './dto/updateClientsDto';
import { AdminDto } from './dto/createAdminDto';
import { Admin } from './entitys/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    private authService: AuthService,
  ) {}

  async findAdmin(data: AdminDto) {
    const admin = await this.adminRepository.findOne({
      where: {
        username: data.username,
      },
    });
    return admin;
  }

  async registerAdmin(data: AdminDto) {
    const admin = data;
    if (await this.findAdmin(admin)) {
      throw new BadRequestException('Already registered', {
        description: 'Please, try to login',
      });
    }
    const hash = await this.authService.hashGen(admin.password);
    admin.password = hash;
    await this.adminRepository.save(admin);
    return `This action register an admin`;
  }

  async loginAdmin(data: AdminDto) {
    const admin = await this.findAdmin(data);
    if (admin == null) {
      throw new NotFoundException('Not found', {
        description: 'Please check your credentials',
      });
    }
    const token = await this.authService.signIn(
      data.password,
      admin.password,
      admin.id,
      admin.username,
      'admin',
    );
    return token;
  }

  async allClients(): Promise<string> {
    return 'This action list all the clients of the exchange';
  }

  async updateClient(id: number, client: UpdateClientDto): Promise<string> {
    console.log(client);
    return `This action modify the ${id} client`;
  }
}
