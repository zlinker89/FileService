import { Controller } from '@nestjs/common';
import { CreateFileDataUseCase, DeleteFileDataUseCase, GetFileDataUseCase } from 'src/modules/file/application/usescases/file';

@Controller('file-data')
export class FileDataController {
    constructor(
        private _createFileData: CreateFileDataUseCase,
        private _getFileData: GetFileDataUseCase,
        private _deleteFileData: DeleteFileDataUseCase,
        ) {
    }
}
