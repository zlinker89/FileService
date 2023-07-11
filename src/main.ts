import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomLoggerService } from './common/services/customLogger.service';
import { LoggingInterceptor } from './common/interceptors/loggin.interceptor';
import { Logger } from '@nestjs/common';
import { bold } from 'chalk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useLogger(await app.resolve(CustomLoggerService));
  app.setGlobalPrefix('file-service/');
  const config = new DocumentBuilder()
    .setTitle('EXPERTOSIP FILESERVICE API')
    .setDescription('Una api para administar sistemas de archivos')
    .setVersion('1.0')
    .addTag('FSExpert')
    .addServer('https://ep1.elpunto.com.co/')
    .addServer('http://localhost:3001/')
    .addBearerAuth(
      {
        // I was also testing it without prefix 'Bearer ' before the JWT
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header',
      },
      'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('file-service/api', app, document);
  await app.listen(process.env.PORT || 3001);
  Logger.log(
    bold.blue(process.env.APPLICATION_NAME) +
    bold.yellow(' Running On Port ') +
    bold.green(`http://localhost:${process.env.PORT || 3001}`),
    'Bootstrap',
  );
}
bootstrap();
