import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';
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
  app.setGlobalPrefix('api', {
    exclude: [{ path: '', method: RequestMethod.GET }],
  });

  // enable CORS for specific origins
  app.enableCors({
    origin: [
      'http://localhost:5173', // react local server
      'visible-one-meeting-booking-website.vercel.app', // production frontend
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // api documentation
  const config = new DocumentBuilder()
    .setTitle('Visible One Meeting Booking API')
    .setDescription('The Visible One Meeting Booking API description')
    .setVersion('1.0')
    .addTag('meetings')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: any = {
    swaggerOptions: {
      supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
    },
    raw: ['json'],
  };
  SwaggerModule.setup('docs', app, document, customOptions);

  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
