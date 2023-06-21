import { Injectable, Inject } from '@nestjs/common';
import { FileSystem } from 'src/common/enums/fileSystem.enum';
import SaveFileLocalUseCase from './SaveFileLocal.usecase';
import { FileDataCommand } from '../../commands/fileData.command';

@Injectable()
export default class FileStorageUseCase {
  constructor(
    private _saveFileLocaUseCase: SaveFileLocalUseCase
  ) {}

  public handler(FileMulter: Express.Multer.File, fileDataCommand: FileDataCommand) {
    let result = null
    switch (fileDataCommand.fileSystem) {
        case FileSystem.LOCAL:
            result = this._saveFileLocaUseCase.handler(FileMulter, fileDataCommand)
            break;
        case FileSystem.AWS:
            // TODO: pendiente implementar el AWS
        break;
        default:
            // TODO: implementar exception wrong file system
            break;
    }
    return result
  }
}