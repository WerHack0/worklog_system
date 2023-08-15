import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from './user-info/user-info.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [UserInfo],
      synchronize:true,
    }),
    TypeOrmModule.forFeature([UserInfo]),
    JwtModule.register({
      //dodać secret do zmiennych środowiskowych
      secret: 'RG9JVEF1dGg',
      signOptions:{expiresIn: '2h'} 
    }),
    ClientsModule.register([{
      name: 'USER_AUTH',
      transport: Transport.TCP,
      options:{
        host: '127.0.0.1',
        port: 4002,
      }
    }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
