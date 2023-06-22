import { Injectable, Inject } from '@nestjs/common';
import { ApiKeyRepository } from '../../../infrastructure/repositories/apiKeyrepository';
import { ApiKeyMapper } from '../../../infrastructure/mappers/api-key/apiKey.mapper';
import { ApiKey } from '../../../../file/domain/api-key/apiKey.model';

@Injectable()
export default class GetFApiKeyUseCase {
  constructor(
    @Inject('ApiKeyRepository') private _apiKeyRepository: ApiKeyRepository,
  ) {}

  public async handler(name: string): Promise<ApiKey[]> {
    const predicate = { name: name };
    const apiKeys = await this._apiKeyRepository.find(predicate);
    return ApiKeyMapper.toDomains(apiKeys);
  }
}