import { Module } from '@nestjs/common';
import { FileDataController } from './infrastructure/controllers/file-data/file-data.controller';
import { DatabaseModule } from '../database/database.module';
import { MulterModule } from '@nestjs/platform-express';
import {
  FileStorageUseCase,
  SaveFileLocalUseCase,
  DeleteFileLocalUseCase,
} from '../shared/application/usecases/file';
import {
  ValidateTokenUseCase,
  VerifyTokenJsonWebTokenUseCase,
} from './application/usescases/api-key';
import { GarbageService } from './application/services/garbage/garbage.service';
import UpdateFileLocalUseCase from '../shared/application/usecases/file/updateFileLocal.usecase';
import { ScheduleModule } from '@nestjs/schedule';
import { SharedModule } from '../shared/shared.module';

@Module({
  controllers: [FileDataController],
  imports: [ScheduleModule.forRoot(), SharedModule, DatabaseModule, MulterModule],
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
