import { ApiProperty } from '@nestjs/swagger';
import { FileSystem } from '../../../../common/enums/fileSystem.enum';
import { IsString } from 'class-validator';

export class FileDataToUpdateCommand {
    @ApiProperty({ required: false })
    @IsString()
    public fileName: string
    @ApiProperty({ required: false })
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
    @ApiProperty({ enum: FileSystem, required: false })
    public fileSystem: FileSystem
    @ApiProperty({ type: 'string', format: 'binary', required: false })
    public file: Express.Multer.File
    @ApiProperty({ type: 'boolean', required: false })
    public isTemporal: boolean
    @ApiProperty({ type: 'string', required: false })
    public createdAt: string
    @ApiProperty({ type: 'string', required: false })
    public expiredAt: string
}