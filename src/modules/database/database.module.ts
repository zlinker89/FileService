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
import { ApiKeyModel, ApiKeySchema } from './domain/models/apiKey.schema';
import { GetFApiKeyUseCase } from './application/usecases/api-key';
import { ApiKeyRepository } from './infrastructure/repositories/apiKeyrepository';

@Module({
  imports: [
  MongooseModule.forFeature([
      { name: FileDataModel.name, schema: FileDataSchema },
      { name: ApiKeyModel.name, schema: ApiKeySchema },
    ]),
  ],
  providers: [
    FileDataFactory,
    { provide: 'FileDataRepository', useClass: FileDataRepository },
    { provide: 'ApiKeyRepository', useClass: ApiKeyRepository },
    CreateFileDataUseCase,
    GetFileDataUseCase,
    DeleteFileDataUseCase,
    GetFApiKeyUseCase
  ],
  exports: [CreateFileDataUseCase, GetFileDataUseCase, DeleteFileDataUseCase, GetFApiKeyUseCase],
})
export class DatabaseModule {}
