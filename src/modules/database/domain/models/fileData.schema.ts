import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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
    fileSize: string;
    @Prop()
    moduleUuId: string;
}
export const FileDataSchema = SchemaFactory.createForClass(FileDataModel);