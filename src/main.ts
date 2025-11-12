import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  console.warn(`server is runnning port on ${process.env.PORT}`)
  console.log('(❁ ´◡`❁ )')
}
bootstrap();
