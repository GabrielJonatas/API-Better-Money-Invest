import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { configuration } from './database/typeOrmConfig';
import { ProductsModule } from './products/products.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
