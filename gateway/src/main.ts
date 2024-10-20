import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { environments } from './config';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-exception.filter';

async function bootstrap() {
  const logger = new Logger("GATEWAY");
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  app.useGlobalFilters( new RpcCustomExceptionFilter());
  await app.listen(environments.port);
  logger.log(`Gateway running on port ${environments.port}`)
}
bootstrap();
