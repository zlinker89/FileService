import { Injectable } from '@nestjs/common';
import { FileDataCommand } from '../../commands/fileData.command';
import { join } from 'path';
import { createDirectoryIfNotExist, createFile } from '../../../infrastructure/helpers/storage.helper';
import DeleteFileLocalUseCase from './DeleteFileLocal.usecase';
@Injectable()
export default class UpdateFileLocalUseCase {
  constructor(
    private _daleteFileLocal: DeleteFileLocalUseCase
  ) {}

  public async handler(FileMulter: Express.Multer.File, fileDataCommand: FileDataCommand, fileDatId: string) {
    await this._daleteFileLocal.handler(fileDatId)
    const directory = join(process.cwd(), './public')
    const path = join(directory, fileDataCommand.filePath)
    await createDirectoryIfNotExist(fileDataCommand.filePath, directory)
    await createFile(path, FileMulter.originalname, FileMulter.buffer)
    return path
  }
}