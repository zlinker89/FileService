import { Injectable, Inject } from '@nestjs/common';
import { FileData } from 'src/modules/file/domain/file/fileData.model';
import { RemovedModel } from 'src/modules/file/infrastructure/interfaces/entity.interface';
import { FileDataRepository } from 'src/modules/database/infrastructure/repositories/fileData.repository';

@Injectable()
export default class DeleteFileDataUseCase {
  constructor(
    @Inject('FileDataRepository') private _fileDataRepository: FileDataRepository,
  ) {}

  public async handler(fileDataId: string): Promise<RemovedModel> {
    const predicate = { _id: fileDataId };
    return this._fileDataRepository.remove(predicate);
  }
}