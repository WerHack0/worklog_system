import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfo } from './user-info/user-info.entity';
import { User } from './user/user.entity';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User, UserInfo],
      synchronize:true,
    }),
    TypeOrmModule.forFeature([User, UserInfo])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
