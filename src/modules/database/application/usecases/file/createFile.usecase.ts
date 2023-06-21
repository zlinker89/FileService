import { Injectable, Inject } from '@nestjs/common';
import { CreatedModel } from 'src/modules/file/infraestructure/interfaces/entity.interface';
import { FileDataCommand } from '../../../../file/application/commands/fileData.command';
import { FileDataFactory } from '../../factories/file/fileData.factory';
import { FileDataRepository } from '../../../infrastructure/repositories/fileData.repository';

@Injectable()
export default class CreateFileDataUseCase {
  constructor(
    @Inject('FileDataRepository')
    private _fileDataRepository: FileDataRepository,
    private _fileDataFactory: FileDataFactory,
  ) {}

  public handler(fileDataCommand: FileDataCommand): Promise<CreatedModel> {
    const fileDataObject =
      this._fileDataFactory.createFileData(fileDataCommand);
    return this._fileDataRepository.create({ ...fileDataObject });
  }
}
