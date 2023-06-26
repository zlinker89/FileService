import { Inject, Injectable } from "@nestjs/common";
import { FileDataRepository } from '../../../infrastructure/repositories/fileData.repository';
import { FileData } from '../../../../file/domain/file/fileData.model';
import { FileDataMapper } from '../../../infrastructure/mappers/file/fileData.mapper';
import { FilterQuery } from "mongoose";
import { FileDataModel } from '../../../domain/models/fileData.schema';

@Injectable()
export default class FilterFileDataUseCase {
  constructor(
    @Inject('FileDataRepository') private _fileDataRepository: FileDataRepository,
  ) {}

  public async handler(predicate: FilterQuery<FileDataModel>): Promise<FileData[]> {
    const files = await this._fileDataRepository.find(predicate);
    return FileDataMapper.toDomains(files);
  }
}