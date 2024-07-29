import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const configuration = {
  type: 'sqlite',
  database: './src/database/sqlite.db',
  autoLoadEntities: true,
  synchronize: true,
} as TypeOrmModuleOptions;
