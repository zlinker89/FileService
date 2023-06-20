import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileDataModel, FileDataSchema } from './domain/models/fileData.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: FileDataModel.name, schema: FileDataSchema }, 
        ]),
    ]
})
export class DatabaseModule {}
