import { Module } from '@nestjs/common';
import { FileDataController } from './infraestructure/controllers/file-data/file-data.controller';
import { CreateFileDataUseCase, DeleteFileDataUseCase, GetFileDataUseCase } from '../database/application/usecases/file';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [FileDataController],
  imports: [DatabaseModule],
})
export class FileModule {}
