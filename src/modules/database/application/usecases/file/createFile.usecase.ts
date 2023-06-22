import { Injectable, Inject } from '@nestjs/common';
import { CreatedModel } from 'src/modules/file/infrastructure/interfaces/entity.interface';
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

  public handler(fileDataCommand: FileDataCommand, fileUpload: Express.Multer.File): Promise<CreatedModel> {
    fileDataCommand.fileName = fileUpload.originalname
    fileDataCommand.filesize = fileUpload.size
    fileDataCommand.mimeType = fileUpload.mimetype
    const fileDataObject =
      this._fileDataFactory.createFileData(fileDataCommand);
    return this._fileDataRepository.create({ ...fileDataObject });
  }
}
