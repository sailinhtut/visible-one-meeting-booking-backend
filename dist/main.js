"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.setGlobalPrefix('api', {
        exclude: [{ path: '', method: common_1.RequestMethod.GET }],
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Visible One Meeting Booking API')
        .setDescription('The Visible One Meeting Booking API description')
        .setVersion('1.0')
        .addTag('meetings')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('/docs', app, document);
    await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
//# sourceMappingURL=main.js.map