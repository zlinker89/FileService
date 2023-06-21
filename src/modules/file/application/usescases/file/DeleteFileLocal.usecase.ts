import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { deleteFile } from '../../../infrastructure/helpers/storage.helper';
import { GetFileDataUseCase } from 'src/modules/database/application/usecases/file';

@Injectable()
export default class DeleteFileLocalUseCase {
  constructor(
    private _getFileData: GetFileDataUseCase,
  ) {}

  public async handler(fileId: string) {
    const files = await this._getFileData.handler(fileId)
    for (const file of files) {
      const path = join(process.cwd(), './public', file.filePath, file.fileName)
      deleteFile(path)
    }
  }
}