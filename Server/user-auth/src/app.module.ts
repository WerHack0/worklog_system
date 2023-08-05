import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'RG9JVEF1dGg=',
      signOptions:{expiresIn: '2h'}
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
