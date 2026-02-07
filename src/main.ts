import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ 
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  );
  app.enableCors({ origin: '*' }); // mvp dan oldin must change
  const config = new DocumentBuilder()
    .setTitle('Portfolio-Swagger')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
  console.warn(`server is runnning port on ${process.env.PORT}`);
  console.log('ishlittiman (❁´◡`❁)');
}
bootstrap();
