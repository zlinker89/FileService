import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ApiKeyModelDocument = ApiKeyModel & Document;

@Schema()
export class ApiKeyModel {
    @Prop()
    apiKeyId: number;
    @Prop()
    name: string;
    @Prop()
    apiKey: string;
}
export const ApiKeySchema = SchemaFactory.createForClass(ApiKeyModel);