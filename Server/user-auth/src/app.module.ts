import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'RG9JVEF1dGg=',
      signOptions:{expiresIn: '2h'}
    }),
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User],
      synchronize:true,
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
