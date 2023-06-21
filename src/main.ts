import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder().setTitle('EXPERTOSIP ASEMPTAXIS API')
    .setDescription("Una api para interconectar ASTERISK con la API de azure, tambiem permite gestionar los eventos por medio del webhook")
    .setVersion('v1')
    .addTag('autocab')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
