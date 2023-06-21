import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileDataCommand } from '../../../application/commands/fileData.command';
import {
  CreateFileDataUseCase,
  DeleteFileDataUseCase,
  GetFileDataUseCase,
} from 'src/modules/database/application/usecases/file';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { FileStorageUseCase } from 'src/modules/file/application/usescases/file';
import { memoryStorage } from 'multer';

@Controller('file-data')
@ApiTags('FSExpert')
export class FileDataController {
  constructor(
    private _fileStorage: FileStorageUseCase,
    private _createFileData: CreateFileDataUseCase,
    private _getFileData: GetFileDataUseCase,
    private _deleteFileData: DeleteFileDataUseCase,
  ) {}

  @Get('/:fileId/preview')
  @ApiResponse({
    status: 200,
    description: 'Consultar file por file name y module uuid',
  })
  async getFileDataToPreview(
    @Param('fileId') fileId: string,
    @Res() res: Response,
  ) {
    const files = await this._getFileData.handler(fileId);
    // TODO: add exception file not found
    const file = createReadStream(join(process.cwd(), 'public', files[0].filePath, files[0].fileName));
    file.pipe(res);
  }

  @Post('/create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage()
  }))
  @ApiResponse({
    status: 201,
    description: 'Create file',
  })
  async createFileData(
    @Body() fileDataCommand: FileDataCommand,
    @UploadedFile() fileUpload: Express.Multer.File,
  ) {
    await this._fileStorage.handler(fileUpload, fileDataCommand);
    const fileCreateModel = await this._createFileData.handler(fileDataCommand, fileUpload);
    return {
      data: fileCreateModel.id,
      status: fileCreateModel.created,
    };
  }
}
