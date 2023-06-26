import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './modules/file/file.module';
import { DatabaseModule } from './modules/database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/loggin.interceptor';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CustomLoggerService } from './common/services/customLogger.service';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FileModule, 
    DatabaseModule, 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.URL_DB),
    ClientsModule.register([
      {
        name: 'LOG_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://franklin:Expertosip%402023.@localhost/'],
          queue: 'log',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    CustomLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
