import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dev_configuration = {
  type: 'sqlite',
  database: './src/database/db/sqlite.db',
  autoLoadEntities: true,
  synchronize: true,
} as TypeOrmModuleOptions;

export const prod_configuration = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [],
  autoLoadEntities: true,
  synchronize: true,
} as TypeOrmModuleOptions;
