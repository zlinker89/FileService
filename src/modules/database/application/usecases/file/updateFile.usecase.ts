import { Injectable, Inject, Logger } from '@nestjs/common';
import { FileDataCommand } from '../../../../file/application/commands/fileData.command';
import { FileDataFactory } from '../../factories/file/fileData.factory';
import { FileDataRepository } from '../../../infrastructure/repositories/fileData.repository';
import { DateTime } from 'luxon';
import { FileNotFoundException } from '../../../../file/application/exceptions/fileNotFound.exception';
import { FileDataMapper } from '../../../infrastructure/mappers/file/fileData.mapper';
import { UpdatedModel } from 'src/modules/file/infrastructure/interfaces/entity.interface';
import FileStorageUseCase from '../../../../shared/application/usecases/file/FileStorage.usecase';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class UpdateFileDataUseCase {
  private readonly logger = new Logger(UpdateFileDataUseCase.name);
  constructor(
    private _fileStorage: FileStorageUseCase,
    @Inject('FileDataRepository')
    private _fileDataRepository: FileDataRepository,
  ) {}

  public async handler(fileDataId: string, fileDataCommand: FileDataCommand, fileUpload?: Express.Multer.File): Promise<UpdatedModel> {
    
    const dateNow = DateTime.local().setZone('America/Bogota')
    const fileData = await this._fileDataRepository.findById(fileDataId)
    if (!fileData) throw new FileNotFoundException("El archivo no fue encontrado", 404);
    const fileDataObject = FileDataMapper.toDomain(fileData)
    if (fileUpload) {
      fileDataCommand.uuidName = uuidv4() + path.extname(fileUpload.originalname)
      fileDataObject.fileName = fileUpload.originalname
      fileDataObject.filesize = fileUpload.size
      fileDataObject.mimeType = fileUpload.mimetype
      try {
        await this._fileStorage.handler(fileUpload, fileDataCommand, true, fileDataObject);
      } catch (error) {
        this.logger.error("El archivo no pudo ser creado", error, UpdateFileDataUseCase.name)
      }
    }
    if (fileDataCommand.isTemporal && !fileDataCommand.expiredAt) {
      fileDataObject.isTemporal = fileDataCommand.isTemporal
      fileDataObject.expiredAt = dateNow.plus({ days: 1 }).toISO();
    }
    const predicate = { _id: fileDataId }
    return this._fileDataRepository.updateOne(predicate, { ...fileDataObject });
  }
}
