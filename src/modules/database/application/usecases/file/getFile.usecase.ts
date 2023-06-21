import { Injectable, Inject } from '@nestjs/common';
import { FileDataFactory } from '../../factories/file/fileData.factory';
import { FileDataRepository } from '../../../infrastructure/repositories/fileData.repository';
import { FileData } from '../../../../file/domain/file/fileData.model';
import { ProductMapper } from '../../../infrastructure/mappers/file/fileData.mapper';

@Injectable()
export default class GetFileDataUseCase {
  constructor(
    @Inject('FileDataRepository') private _fileDataRepository: FileDataRepository,
  ) {}

  public async handler(fileName: string, moduleUuId: string): Promise<FileData[]> {
    const predicate = { fileName: fileName, ModuleUuId: moduleUuId };
    const files = await this._fileDataRepository.find(predicate);
    return ProductMapper.toDomains(files);
  }
}