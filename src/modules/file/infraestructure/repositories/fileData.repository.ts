import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RepositoryBase } from "../bases/repository.base.";
import { FileData } from "../../domain/file/fileData.model";
import { FileDataModel, FileDataModelDocument } from "src/modules/database/domain/models/fileData.schema";

export class FileDataRepository extends RepositoryBase<FileDataModel> {
    constructor(@InjectModel(FileData.name) private entity: Model<FileDataModelDocument>) {
        super(entity);
    }
}