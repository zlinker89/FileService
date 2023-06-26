import { Module } from '@nestjs/common';
import { FileDataController } from './infrastructure/controllers/file-data/file-data.controller';
import { DatabaseModule } from '../database/database.module';
import { MulterModule } from '@nestjs/platform-express';
import {
  FileStorageUseCase,
  SaveFileLocalUseCase,
  DeleteFileLocalUseCase,
} from './application/usescases/file';
import {
  ValidateTokenUseCase,
  VerifyTokenJsonWebTokenUseCase,
} from './application/usescases/api-key';
import UpdateFileLocalUseCase from './application/usescases/file/updateFileLocal.usecase';

@Module({
  controllers: [FileDataController],
  imports: [DatabaseModule, MulterModule],
providers: [
    FileStorageUseCase,
    SaveFileLocalUseCase,
    DeleteFileLocalUseCase,
    UpdateFileLocalUseCase,
    ValidateTokenUseCase,
    VerifyTokenJsonWebTokenUseCase,
  ],
})
export class FileModule {}
