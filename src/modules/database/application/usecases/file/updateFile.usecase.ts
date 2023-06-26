import { Injectable, Inject } from '@nestjs/common';
import { FileDataCommand } from '../../../../file/application/commands/fileData.command';
import { FileDataFactory } from '../../factories/file/fileData.factory';
import { FileDataRepository } from '../../../infrastructure/repositories/fileData.repository';
import { DateTime } from 'luxon';
import { FileNotFoundException } from '../../../../file/application/exceptions/fileNotFound.exception';
import { FileDataMapper } from '../../../infrastructure/mappers/file/fileData.mapper';
import { UpdatedModel } from 'src/modules/file/infrastructure/interfaces/entity.interface';

@Injectable()
export default class UpdateFileDataUseCase {
  constructor(
    @Inject('FileDataRepository')
    private _fileDataRepository: FileDataRepository,
  ) {}

  public async handler(fileDataId: string, fileDataCommand: FileDataCommand, fileUpload?: Express.Multer.File): Promise<UpdatedModel> {
    const dateNow = DateTime.local().setZone('America/Bogota')
    const fileData = await this._fileDataRepository.findById(fileDataId)
    if (!fileData) throw new FileNotFoundException("El archivo no fue encontrado", 404);
    const fileDataObject = FileDataMapper.toDomain(fileData)
    if (fileUpload) {
      fileDataObject.fileName = fileUpload.originalname
      fileDataObject.filesize = fileUpload.size
      fileDataObject.mimeType = fileUpload.mimetype
    }
    if (fileDataCommand.isTemporal && !fileDataCommand.expiredAt) {
      fileDataObject.isTemporal = fileDataCommand.isTemporal
      fileDataObject.expiredAt = dateNow.plus({ days: 1 }).toISO();
    }
    const predicate = { _id: fileDataId }
    return this._fileDataRepository.updateOne(predicate, { ...fileDataObject });
  }
}
