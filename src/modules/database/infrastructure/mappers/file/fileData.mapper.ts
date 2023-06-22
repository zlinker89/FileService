import { FileData } from '../../../../file/domain/file/fileData.model';
import { FileDataModel } from '../../../domain/models/fileData.schema';

export class ProductMapper {
    public static toDomain(fileDataModel: FileDataModel): FileData {
      const fileData = new FileData(
        fileDataModel.fileName,
        fileDataModel.filePath,
        fileDataModel.fileSize,
        fileDataModel.moduleUuId,
        fileDataModel.fileSystem,
        fileDataModel.mimeType,
      );
  
      return fileData;
    }
  
    public static toDomains(fileDataModels: FileDataModel[]): FileData[] {
      const fileDatas = new Array<FileData>();
      fileDataModels.forEach((fileDataModel) => {
        const fileData = this.toDomain(fileDataModel);
        fileDatas.push(fileData);
      });
      return fileDatas;
    }
  }