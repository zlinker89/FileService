import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import DeleteFileDataUseCase from './../../../../database/application/usecases/file/deleteFile.usecase';
import Get from './../../../../database/application/usecases/file/filterFile.usecase';
import { DateTime } from 'luxon';
import DeleteFileLocalUseCase from '../../../../shared/application/usecases/file/DeleteFileLocal.usecase';
import FilterFileDataUseCase from './../../../../database/application/usecases/file/filterFile.usecase';

@Injectable()
export class GarbageService {
  private readonly logger = new Logger(GarbageService.name);
  constructor(
    private _filterFileDataUseCase: FilterFileDataUseCase,
    private _deleteFileData: DeleteFileDataUseCase,
    private _deleteFileLocalData: DeleteFileLocalUseCase,
  ) {
    this.logger.debug('Start Garbage cronjob');
  }
  // @Cron('0 50 23 */1 * *')
  @Cron('*/10 * * * * *')
  async handleCron() {
    const dateNow = DateTime.local().setZone('America/Bogota').toString()
    const predicate = {
      $and:[
        { isTemporal: true },
        {
          expiredAt: {
            $lte: dateNow
          }
        }
      ]
    }
    const files = await this._filterFileDataUseCase.handler(predicate)
    try {
      for (const file of files) {
        await this._deleteFileLocalData.handler(file.uuidName, file.filePath);
        await this._deleteFileData.handler(file._id);
        this.logger.debug("El archivo fue eliminado", file.uuidName)
      }
    } catch (error) {
      this.logger.error("El archivo no se puedo eliminar", error, GarbageService.name)
    }
  }
}
