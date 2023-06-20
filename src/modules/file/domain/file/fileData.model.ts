export class FileData {
    fileName: string
    filePath: string
    filesize: number
    moduleUuId: string
    constructor(fileName: string, filePath: string, fileSize: number, moduleUuId: string) {
        this.fileName = fileName
        this.filePath = filePath
        this.filesize = fileSize
        this.moduleUuId = moduleUuId
    }
}