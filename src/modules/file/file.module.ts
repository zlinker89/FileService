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
import { GarbageService } from './application/services/garbage/garbage.service';
import UpdateFileLocalUseCase from './application/usescases/file/updateFileLocal.usecase';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  controllers: [FileDataController],
  imports: [ScheduleModule.forRoot(), DatabaseModule, MulterModule],
  providers: [
    FileStorageUseCase,
    SaveFileLocalUseCase,
    DeleteFileLocalUseCase,
    UpdateFileLocalUseCase,
    ValidateTokenUseCase,
    VerifyTokenJsonWebTokenUseCase,
    GarbageService,
  ],
})
export class FileModule {}
