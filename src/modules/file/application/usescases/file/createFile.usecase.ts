import { Injectable, Inject } from '@nestjs/common';
import { FileData } from 'src/modules/file/domain/file/fileData.model';
import { CreatedModel } from 'src/modules/file/infraestructure/interfaces/entity.interface';
import { FileDataRepository } from 'src/modules/file/infraestructure/repositories/fileData.repository';

@Injectable()
export default class CreateFileDataUseCase {
  constructor(
    @Inject('FileDataRepository') private _fileDataRepository: FileDataRepository,
  ) {}

  public handler(fileDataObject: FileData): Promise<CreatedModel> {
    const fileObject =  { ...fileDataObject};
    return this._fileDataRepository.create(fileObject);
  }
}