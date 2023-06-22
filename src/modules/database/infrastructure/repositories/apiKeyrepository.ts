import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RepositoryBase } from "../bases/repository.base.";
import { Injectable } from '@nestjs/common';
import { ApiKeyModel, ApiKeyModelDocument } from "../../domain/models/apiKey.schema";

@Injectable()
export class ApiKeyRepository extends RepositoryBase<ApiKeyModel> {
    constructor(@InjectModel(ApiKeyModel.name) private entity: Model<ApiKeyModelDocument>) {
        super(entity);
    }
}