import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileDataModel, FileDataSchema } from './domain/models/fileData.schema';
import {
  CreateFileDataUseCase,
  DeleteFileDataUseCase,
  GetFileDataUseCase,
} from './application/usecases/file';
import { FileDataFactory } from './application/factories/file/fileData.factory';
import { FileDataRepository } from './infrastructure/repositories/fileData.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FileDataModel.name, schema: FileDataSchema },
    ]),
  ],
  providers: [
    FileDataFactory,
    { provide: 'FileDataRepository', useClass: FileDataRepository },
    CreateFileDataUseCase,
    GetFileDataUseCase,
    DeleteFileDataUseCase,
  ],
  exports: [CreateFileDataUseCase, GetFileDataUseCase, DeleteFileDataUseCase],
})
export class DatabaseModule {}
