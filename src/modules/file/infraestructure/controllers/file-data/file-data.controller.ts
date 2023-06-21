import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { FileDataCommand } from '../../../application/commands/fileData.command';
import {
  CreateFileDataUseCase,
  DeleteFileDataUseCase,
  GetFileDataUseCase,
} from 'src/modules/database/application/usecases/file';

@Controller('file-data')
export class FileDataController {
  constructor(
    private _createFileData: CreateFileDataUseCase,
    private _getFileData: GetFileDataUseCase,
    private _deleteFileData: DeleteFileDataUseCase,
  ) {}

  @Get('/:fileName/module/:moduleUuId')
  @ApiResponse({
    status: 200,
    description: 'Consultar file por file name y module uuid',
  })
  async getFileData(@Param('fileName') fileName: string, @Param('moduleUuId') moduleUuId: string) {
    const files = await this._getFileData.handler(fileName, moduleUuId);
    return {
      data: files,
      count: files.length,
      status: files.length > 0,
    };
  }

  @Post('/create')
  @ApiResponse({
    status: 201,
    description: 'Create file',
  })
  async createFileData(@Body() fileDataCommand: FileDataCommand) {
    const fileCreateModel = await this._createFileData.handler(fileDataCommand);
    return {
      data: fileCreateModel.id,
      status: fileCreateModel.created,
    };
  }
}
