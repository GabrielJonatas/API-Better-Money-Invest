import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateClientDto } from './dto/updateClients.dto';
import { AdminDto } from './dto/createAdmin.dto';
import { Admin } from './entitys/admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseService } from 'src/database/database.service';
import { User } from 'src/user/entitys/user.entity';
import { Invest } from 'src/user/entitys/invest.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Invest) private investRepository: Repository<Invest>,
    private authService: AuthService,
    private databaseService: DatabaseService,
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
    if (!data.username || data.username.length < 4) {
      throw new BadRequestException(
        'Username must have more than 4 characters',
      );
    } else if (data.password.length < 8 || data.password.length > 15) {
      throw new BadRequestException(
        'Password needs to be between 8 characters and 15 characters',
      );
    }
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

  async allClients() {
    return await this.databaseService.findAll(this.userRepository);
  }

  async allInvestments() {
    return await this.databaseService.findRelations(this.investRepository, {
      product: true,
      user: true,
    });
  }

  async updateClient(id: number, update: UpdateClientDto) {
    const client = await this.databaseService.find(
      { id: id },
      this.userRepository,
    );
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    await this.databaseService.updateEntity(
      { id: id },
      update,
      this.userRepository,
    );
  }
}
