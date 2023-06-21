import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { join } from 'path';
import { FileDataCommand } from '../../commands/fileData.command';
import { createDirectoryIfNotExist, createFile } from '../../../infrastructure/helpers/storage.helper';

@Injectable()
export default class SaveFileLocalUseCase {
  constructor(
  ) {}

  public handler(FileMulter: Express.Multer.File, fileDataCommand: FileDataCommand) {
    const directory = join(process.cwd(), './public')
    const path = join(directory, fileDataCommand.filePath)
    createDirectoryIfNotExist(fileDataCommand.filePath, directory)
    createFile(path, FileMulter.originalname, FileMulter.buffer)
    return path
  }
}