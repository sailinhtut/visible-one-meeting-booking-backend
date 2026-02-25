import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // request validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // api versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');

  // api documentation
  const config = new DocumentBuilder()
    .setTitle('Visible One Meeting Booking API')
    .setDescription('The Visible One Meeting Booking API description')
    .setVersion('1.0')
    .addTag('meetings')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
