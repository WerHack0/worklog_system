import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity';
import { JwtStrategy } from './local.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PassportModule,
    
    ConfigModule.forRoot({ isGlobal: true}),
    JwtModule.register({
      
      secret: process.env.JWT_SECRET,
      signOptions:{expiresIn: '2h'}
    }),
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
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([{
      name: 'USER_SERVICE',
      transport: Transport.TCP,
      options:{
        host: '127.0.0.1',
        port: 4001,
      }
    }]),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, JwtStrategy],
})
export class AppModule {}
