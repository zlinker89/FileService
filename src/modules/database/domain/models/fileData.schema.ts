import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { FileSystem } from '../../../../common/enums/fileSystem.enum';

export type FileDataModelDocument = FileDataModel & Document;

@Schema()
export class FileDataModel {
    @Prop()
    fileDataId: number;
    @Prop()
    fileName: string;
    @Prop()
    filePath: string;
    @Prop()
    fileSize: number;
    @Prop()
    moduleUuId: string;
    @Prop()
    mimeType: string;
    @Prop({ type: String, enum: FileSystem })
    fileSystem: FileSystem;
}
export const FileDataSchema = SchemaFactory.createForClass(FileDataModel);