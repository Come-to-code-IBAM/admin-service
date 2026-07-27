import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BusinessErrorFilter } from './infrastructure/filters/business-error.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new BusinessErrorFilter());
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
}

void bootstrap();
