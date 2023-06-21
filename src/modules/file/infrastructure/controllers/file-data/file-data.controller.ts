import {
  Body,
  Controller,
  Delete,
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
import { DeleteFileLocalUseCase, FileStorageUseCase } from 'src/modules/file/application/usescases/file';
import { memoryStorage } from 'multer';
import { FileNotFoundException } from '../../../application/exceptions/fileNotFound.exception';

@Controller('file-data')
@ApiTags('FSExpert')
export class FileDataController {
  constructor(
    private _fileStorage: FileStorageUseCase,
    private _createFileData: CreateFileDataUseCase,
    private _getFileData: GetFileDataUseCase,
    private _deleteFileData: DeleteFileDataUseCase,
    private _deleteFileLocalData: DeleteFileLocalUseCase,
  ) {}

  @Get('/:fileId/preview')
  @ApiResponse({
    status: 200,
    description: 'Previsualizar el file por ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Archivo no encontrado',
  })
  async getFileDataToPreview(
    @Param('fileId') fileId: string,
    @Res() res: Response,
  ) {
    try {
      const files = await this._getFileData.handler(fileId);
      const file = createReadStream(join(process.cwd(), 'public', files[0].filePath, files[0].fileName));
      file.pipe(res);
    } catch (error) {
      throw new FileNotFoundException("El archivo no fue encontrado", 404)
    }
  }

  @Get('/:fileId')
  @ApiResponse({
    status: 200,
    description: 'Consultar file por ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Archivo no encontrado',
  })
  async getFileData(
    @Param('fileId') fileId: string
  ) {
    try {
      const files = await this._getFileData.handler(fileId);
      return {
        data: files,
        count: files.length,
        status: files.length > 0
      }
    } catch (error) {
      throw new FileNotFoundException("El archivo no fue encontrado", 404)
    }
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
    try {
      await this._fileStorage.handler(fileUpload, fileDataCommand);
    } catch (error) {
      // TODO: crear exception CreateFileException
    }
    const fileCreateModel = await this._createFileData.handler(fileDataCommand, fileUpload);
    return {
      data: fileCreateModel.id,
      status: fileCreateModel.created,
    };
  }

  @Delete('/:fileId')
  @ApiResponse({
    status: 200,
    description: 'Eliminar file por ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Archivo no encontrado',
  })
  async deleteFileData(
    @Param('fileId') fileId: string
  ) {
    try {
      await this._deleteFileLocalData.handler(fileId);
      const fileDeleteModel = await this._deleteFileData.handler(fileId);
      return {
        count: fileDeleteModel.deletedCount,
        status: fileDeleteModel.deleted,
      };
    } catch (error) {
      throw new FileNotFoundException("El archivo no fue encontrado", 404)
    }
  }
}
