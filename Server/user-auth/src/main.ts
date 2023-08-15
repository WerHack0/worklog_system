import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TcpOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options:{
      host: '127.0.0.1',
      port: 4002,
    }
  });

  await app.listen();
  
}
bootstrap();
