import { Injectable } from '@nestjs/common';
import { FileDataCommand } from '../../../../file/application/commands/fileData.command';
import { join } from 'path';
import { createDirectoryIfNotExist, createFile } from '../../../../file/infrastructure/helpers/storage.helper';
import DeleteFileLocalUseCase from './DeleteFileLocal.usecase';
import { FileDataToUpdateCommand } from '../../../../file/application/commands/fileDataToUpdate.command';
@Injectable()
export default class UpdateFileLocalUseCase {
  constructor(
    private _daleteFileLocal: DeleteFileLocalUseCase
  ) {}

  public async handler(FileMulter: Express.Multer.File, fileDataCommand: FileDataCommand | FileDataToUpdateCommand, fileName: string, filePath: string) {
    await this._daleteFileLocal.handler(filePath, fileName)
    const directory = join(process.cwd(), './public')
    const path = join(directory, fileDataCommand.filePath)
    await createDirectoryIfNotExist(fileDataCommand.filePath, directory)
    await createFile(path, FileMulter.originalname, FileMulter.buffer)
    return path
  }
}