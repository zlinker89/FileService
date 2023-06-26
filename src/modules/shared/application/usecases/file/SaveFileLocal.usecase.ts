import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { join } from 'path';
import { FileDataCommand } from '../../../../file/application/commands/fileData.command';
import { createDirectoryIfNotExist, createFile } from '../../../../file/infrastructure/helpers/storage.helper';
import { FileDataToUpdateCommand } from '../../../../file/application/commands/fileDataToUpdate.command';

@Injectable()
export default class SaveFileLocalUseCase {
  constructor(
  ) {}

  public async handler(FileMulter: Express.Multer.File, fileDataCommand: FileDataCommand | FileDataToUpdateCommand) {
    const directory = join(process.cwd(), './public')
    const path = join(directory, fileDataCommand.filePath)
    await createDirectoryIfNotExist(fileDataCommand.filePath, directory)
    await createFile(path, fileDataCommand.uuidName, FileMulter.buffer)
    return path
  }
}