import { Module } from '@nestjs/common';
import { FileDataController } from './infrastructure/controllers/file-data/file-data.controller';
import { DatabaseModule } from '../database/database.module';
import { MulterModule } from '@nestjs/platform-express';
import {
  FileStorageUseCase,
  SaveFileLocalUseCase,
} from './application/usescases/file';

@Module({
  controllers: [FileDataController],
  imports: [DatabaseModule, MulterModule],
  providers: [FileStorageUseCase, SaveFileLocalUseCase],
})
export class FileModule {}
