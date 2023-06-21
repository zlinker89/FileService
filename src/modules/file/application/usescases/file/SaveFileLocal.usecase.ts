import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { join } from 'path';
import { FileDataCommand } from '../../commands/fileData.command';
import { createFile } from '../../../infrastructure/helpers/storage.helper';

@Injectable()
export default class SaveFileLocalUseCase {
  constructor(
  ) {}

  public handler(FileMulter: Express.Multer.File, fileDataCommand: FileDataCommand) {
    const path = join(process.cwd(), './public', fileDataCommand.filePath)
    createFile(path, FileMulter.originalname, FileMulter.buffer)
    return path
  }
}