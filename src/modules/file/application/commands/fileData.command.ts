import { FileSystem } from '../../../../common/enums/fileSystem.enum';

export class FileDataCommand {
    public fileName: string
    public filePath: string
    public filesize: number
    public moduleUuId: string
    public fileSystem: FileSystem
}