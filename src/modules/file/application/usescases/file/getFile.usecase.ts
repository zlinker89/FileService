import { Injectable, Inject } from '@nestjs/common';
import { FileDataModel } from 'src/modules/database/domain/models/fileData.schema';
import { FileData } from 'src/modules/file/domain/file/fileData.model';
import { FileDataRepository } from 'src/modules/file/infraestructure/repositories/fileData.repository';

@Injectable()
export default class GetFileDataUseCase {
  constructor(
    @Inject('FileDataRepository') private _fileDataRepository: FileDataRepository,
  ) {}

  public handler(fileDataObject: FileData): Promise<FileDataModel[]> {
    const predicate = { fileName: fileDataObject.fileName, ModuleUuId: fileDataObject.moduleUuId };
    return this._fileDataRepository.find(predicate);
  }
}