import { Injectable, Inject, Logger } from '@nestjs/common';
import { CreatedModel } from 'src/modules/file/infrastructure/interfaces/entity.interface';
import { FileDataCommand } from '../../../../file/application/commands/fileData.command';
import { FileDataFactory } from '../../factories/file/fileData.factory';
import { FileDataRepository } from '../../../infrastructure/repositories/fileData.repository';
import { DateTime } from 'luxon';
import FileStorageUseCase from '../../../../shared/application/usecases/file/FileStorage.usecase';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class CreateFileDataUseCase {
  private readonly logger = new Logger(CreateFileDataUseCase.name);
  constructor(
    private _fileStorage: FileStorageUseCase,
    @Inject('FileDataRepository')
    private _fileDataRepository: FileDataRepository,
    private _fileDataFactory: FileDataFactory,
  ) {}

  public async handler(fileDataCommand: FileDataCommand, fileUpload: Express.Multer.File): Promise<CreatedModel> {
    fileDataCommand.fileName = fileUpload.originalname
    fileDataCommand.filesize = fileUpload.size
    fileDataCommand.mimeType = fileUpload.mimetype
    const dateNow = DateTime.local().setZone('America/Bogota')
    fileDataCommand.createdAt = dateNow.toISO();
    if (fileDataCommand.isTemporal && !fileDataCommand.expiredAt) {
      fileDataCommand.expiredAt = dateNow.plus({ days: 1 }).toISO();
    }
    try {
      fileDataCommand.uuidName = uuidv4() + path.extname(fileUpload.originalname)
      await this._fileStorage.handler(fileUpload, fileDataCommand);
    } catch (error) {
      this.logger.error("El archivo no pudo ser creado", error, CreateFileDataUseCase.name)
    }
    const fileDataObject =
      this._fileDataFactory.createFileData(fileDataCommand);
      console.log('obj ', fileDataObject)
    return this._fileDataRepository.create({ ...fileDataObject });
  }
}
