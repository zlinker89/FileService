import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileDataCommand } from '../../../application/commands/fileData.command';
import {
  CreateFileDataUseCase,
  DeleteFileDataUseCase,
  GetFileDataUseCase,
  UpdateFileDataUseCase,
} from 'src/modules/database/application/usecases/file';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { DeleteFileLocalUseCase, FileStorageUseCase } from 'src/modules/shared/application/usecases/file';
import { memoryStorage } from 'multer';
import { FileNotFoundException } from '../../../application/exceptions/fileNotFound.exception';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { customAuthHeader } from '../../headers/custom.header';
import { FileDataToUpdateCommand } from '../../../application/commands/fileDataToUpdate.command';

@Controller('file-data')
@ApiTags('FSExpert')
export class FileDataController {
  private readonly logger = new Logger(FileDataController.name);
  constructor(
    private _fileStorage: FileStorageUseCase,
    private _createFileData: CreateFileDataUseCase,
    private _updateFileData: UpdateFileDataUseCase,
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
      const file = createReadStream(join(process.cwd(), 'public', files[0].filePath, files[0].uuidName));
      res.set({
        'Content-Type': files[0].mimeType,
        'Content-Disposition': `attachment; filename="${files[0].fileName}"`,
      });
      file.pipe(res);
    } catch (error) {
      this.logger.error("El archivo no fue encontrado", error, HttpStatus.NOT_FOUND, FileDataController.name, 'FileService')
      throw new FileNotFoundException("El archivo no fue encontrado", HttpStatus.NOT_FOUND)
    }
  }
  @UseGuards(AuthGuard)
  @Get('/:fileId')
  @ApiHeaders(customAuthHeader)
  @ApiBearerAuth('access-token')
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
      this.logger.error("El archivo no fue encontrado", error, FileDataController.name)
      throw new FileNotFoundException("El archivo no fue encontrado", 404)
    }
  }
  @UseGuards(AuthGuard)
  @Post('/create')
  @ApiHeaders(customAuthHeader)
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
  }))
  @ApiResponse({
    status: 201,
    description: 'Create file',
  })
  async createFileData(
    @Body() fileDataCommand: FileDataCommand,
    @UploadedFile() fileUpload: Express.Multer.File,
  ) {
    const fileCreateModel = await this._createFileData.handler(fileDataCommand, fileUpload);
    console.log('create ', fileCreateModel)
    return {
      data: fileCreateModel.id,
      status: fileCreateModel.created,
    };
  }

  @UseGuards(AuthGuard)
  @Put('/:fileId')
  @ApiHeaders(customAuthHeader)
  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage()
  }))
  @ApiResponse({
    status: 200,
    description: 'Update file',
  })
  async updateFileData(
    @Param('fileId') fileDataId: string,
    @Body() fileDataCommand: FileDataToUpdateCommand,
    @UploadedFile() fileUpload?: Express.Multer.File,
  ) {
    const fileUpdateModel = await this._updateFileData.handler(fileDataId, fileDataCommand, fileUpload);
    return {
      data: fileUpdateModel.modifiedCount,
      status: fileUpdateModel.modifiedCount > 0,
    };
  }

  @UseGuards(AuthGuard)
  @Delete('/:fileId')
  @ApiHeaders(customAuthHeader)
  @ApiBearerAuth('access-token')
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
      const files = await this._getFileData.handler(fileId);
      await this._deleteFileLocalData.handler(files[0].filePath, files[0].uuidName);
      const fileDeleteModel = await this._deleteFileData.handler(fileId);
      return {
        count: fileDeleteModel.deletedCount,
        status: fileDeleteModel.deleted,
      };
    } catch (error) {
      this.logger.error("El archivo no se puedo eliminar", error, FileDataController.name)
      throw new FileNotFoundException("El archivo no fue encontrado", 404)
    }
  }
}
