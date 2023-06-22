import { ApiKeyModel } from '../../../domain/models/apiKey.schema';
import { ApiKey } from '../../../../file/domain/api-key/apiKey.model';
export class ApiKeyMapper {
    public static toDomain(apiKeyModel: ApiKeyModel): ApiKey {
      const apiKey = new ApiKey(
        apiKeyModel.name,
        apiKeyModel.apiKey,
      );
  
      return apiKey;
    }
  
    public static toDomains(apiKeyModels: ApiKeyModel[]): ApiKey[] {
      const apiKeys = new Array<ApiKey>();
      apiKeyModels.forEach((apiKeyModel) => {
        const apiKey = this.toDomain(apiKeyModel);
        apiKeys.push(apiKey);
      });
      return apiKeys;
    }
  }