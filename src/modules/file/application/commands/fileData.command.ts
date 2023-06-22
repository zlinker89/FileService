import { ApiProperty } from '@nestjs/swagger';
import { FileSystem } from '../../../../common/enums/fileSystem.enum';
import { IsString } from 'class-validator';

export class FileDataCommand {
    @ApiProperty({ required: false })
    @IsString()
    public fileName: string
    @ApiProperty({ required: true })
    @IsString()
    public filePath: string
    @ApiProperty({ type: 'number', required: false })
    @IsString()
    public filesize: number
    @ApiProperty({ required: false })
    @IsString()
    public moduleUuId: string
    @ApiProperty({ required: false })
    @IsString()
    public mimeType: string
    @ApiProperty({ enum: FileSystem, required: true })
    public fileSystem: FileSystem
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    public file: Express.Multer.File
}