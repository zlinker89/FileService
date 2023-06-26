import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { checkIfDirectoryEmpty, deleteFile } from '../../../../file/infrastructure/helpers/storage.helper';

@Injectable()
export default class DeleteFileLocalUseCase {
  constructor(
  ) {}

  public async handler(filePath: string, fileName: string) {
    const fullPath = join(process.cwd(), 'public', filePath, fileName)
    deleteFile(fullPath)
    checkIfDirectoryEmpty(fullPath)
  }
}