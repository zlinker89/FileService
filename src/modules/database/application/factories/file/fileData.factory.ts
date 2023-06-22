import { Injectable } from '@nestjs/common';
import { FileDataCommand } from '../../../../file/application/commands/fileData.command';
import { FileData } from '../../../../file/domain/file/fileData.model';

@Injectable()
export class FileDataFactory {
  public createFileData(fileDataCommand: FileDataCommand): FileData {
    return new FileData(
        fileDataCommand.fileName,
        fileDataCommand.filePath,
        fileDataCommand.filesize,
        fileDataCommand.moduleUuId,
        fileDataCommand.fileSystem,
        fileDataCommand.mimeType,
    );
  }
}
