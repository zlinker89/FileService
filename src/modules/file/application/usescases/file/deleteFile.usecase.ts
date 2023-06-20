import { Injectable, Inject } from '@nestjs/common';
import { FileData } from 'src/modules/file/domain/file/fileData.model';
import { RemovedModel } from 'src/modules/file/infraestructure/interfaces/entity.interface';
import { FileDataRepository } from 'src/modules/file/infraestructure/repositories/fileData.repository';

@Injectable()
export default class DeleteFileDataUseCase {
  constructor(
    @Inject('FileDataRepository') private _fileDataRepository: FileDataRepository,
  ) {}

  public handler(fileDataObject: FileData): Promise<RemovedModel> {
    const predicate = { fileName: fileDataObject.fileName, ModuleUuId: fileDataObject.moduleUuId };
    return this._fileDataRepository.remove(predicate);
  }
}