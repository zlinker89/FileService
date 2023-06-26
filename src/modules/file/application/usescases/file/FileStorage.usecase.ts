import { Injectable, Inject } from '@nestjs/common';
import { FileSystem } from 'src/common/enums/fileSystem.enum';
import SaveFileLocalUseCase from './SaveFileLocal.usecase';
import { FileDataCommand } from '../../commands/fileData.command';
import UpdateFileLocalUseCase from './updateFileLocal.usecase';
import { FileDataToUpdateCommand } from '../../commands/fileDataToUpdate.command';

@Injectable()
export default class FileStorageUseCase {
  constructor(
    private _saveFileLocaUseCase: SaveFileLocalUseCase,
    private _updateFileLocalUseCase: UpdateFileLocalUseCase
  ) {}

  public handler(FileMulter: Express.Multer.File, fileDataCommand: FileDataCommand | FileDataToUpdateCommand, isUpdate = false, fileDataId = null) {
    switch (fileDataCommand.fileSystem) {
        case FileSystem.LOCAL:
            if (!isUpdate) return this._saveFileLocaUseCase.handler(FileMulter, fileDataCommand)
            return this._updateFileLocalUseCase.handler(FileMulter, fileDataCommand, fileDataId)
        case FileSystem.AWS:
            // TODO: pendiente implementar el AWS
        break;
        default:
            // TODO: implementar exception wrong file system
            break;
    }
  }
}