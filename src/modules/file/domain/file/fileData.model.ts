import { FileSystem } from '../../../../common/enums/fileSystem.enum';
export class FileData {
    fileName: string
    filePath: string
    filesize: number
    moduleUuId: string
    mimeType: string
    fileSystem: FileSystem
    constructor(fileName: string, filePath: string, fileSize: number, moduleUuId: string, fileSystem: FileSystem, mimeType: string) {
        this.fileName = fileName
        this.filePath = filePath
        this.mimeType = mimeType
        this.filesize = fileSize
        this.moduleUuId = moduleUuId
        this.fileSystem = fileSystem
    }
}

