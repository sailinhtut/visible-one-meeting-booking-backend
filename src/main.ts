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

  // api documentation
  const config = new DocumentBuilder()
    .setTitle('Visible One Meeting Booking API')
    .setDescription('The Visible One Meeting Booking API description')
    .setVersion('1.0')
    .addTag('meetings')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('/docs', app, document, {
  //   customCss:
  //     'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.29.1/swagger-ui.css',
  //   customJs:
  //     'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.29.1/swagger-ui-bundle.min.js',
  //   customJsStr:
  //     'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.29.1/swagger-ui-standalone-preset.min.js',
  // });
  SwaggerModule.setup('/docs', app, document, {
    swaggerOptions: {
      url: '/docs-json',
    },
  });

  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
