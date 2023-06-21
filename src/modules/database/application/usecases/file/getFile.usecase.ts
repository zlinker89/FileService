import { Injectable, Inject } from '@nestjs/common';
import { FileDataRepository } from '../../../infrastructure/repositories/fileData.repository';
import { FileData } from '../../../../file/domain/file/fileData.model';
import { ProductMapper } from '../../../infrastructure/mappers/file/fileData.mapper';

@Injectable()
export default class GetFileDataUseCase {
  constructor(
    @Inject('FileDataRepository') private _fileDataRepository: FileDataRepository,
  ) {}

  public async handler(fileId: string): Promise<FileData[]> {
    const predicate = { _id: fileId };
    const files = await this._fileDataRepository.find(predicate);
    return ProductMapper.toDomains(files);
  }
}