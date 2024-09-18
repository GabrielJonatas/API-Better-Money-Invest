import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { configuration } from './database/configuration/typeOrmConfig';
import { ProductsModule } from './products/products.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
    }),
    ProductsModule,
    AdminModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot(configuration),
    LoggerModule,
  ],
})
export class AppModule {}
