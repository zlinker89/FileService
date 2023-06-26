import { Module } from '@nestjs/common';
import {
  DeleteFileLocalUseCase,
  FileStorageUseCase,
  SaveFileLocalUseCase,
  UpdateFileLocalUseCase,
} from './application/usecases/file';

@Module({
  imports: [],
  providers: [
    FileStorageUseCase,
    SaveFileLocalUseCase,
    DeleteFileLocalUseCase,
    UpdateFileLocalUseCase,
  ],
  exports: [
    FileStorageUseCase,
    SaveFileLocalUseCase,
    DeleteFileLocalUseCase,
    UpdateFileLocalUseCase,
  ],
})
export class SharedModule {}
