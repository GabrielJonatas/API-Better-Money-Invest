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
    const admin = await this.databaseService.find(
      { username: data.username },
      this.adminRepository,
    );
    return admin;
  }

  async registerAdmin(data: AdminDto): Promise<void> {
    const admin = data;
    if (await this.findAdmin(admin)) {
      throw new BadRequestException('Admin already registered. Try to login.');
    }
    const hash = await this.authService.hashGen(admin.password);
    admin.password = hash;
    await this.adminRepository.save(admin);
  }

  async loginAdmin(data: AdminDto) {
    const admin = await this.findAdmin(data);
    if (admin == null) {
      throw new NotFoundException('Admin not found.');
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
