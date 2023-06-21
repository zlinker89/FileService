import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RepositoryBase } from "../bases/repository.base.";
import { FileDataModel, FileDataModelDocument } from '../../domain/models/fileData.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileDataRepository extends RepositoryBase<FileDataModel> {
    constructor(@InjectModel(FileDataModel.name) private entity: Model<FileDataModelDocument>) {
        super(entity);
    }
}