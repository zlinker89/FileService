import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetFApiKeyUseCase } from './../../../../database/application/usecases/api-key';
import { Autorizer } from '../../../../../common/enums/authorizer.enum';
import VerifyTokenJsonWebTokenUseCase from './verifyTokenJsonWebToken.usecase';

@Injectable()
export default class ValidateTokenUseCase {
  constructor(
    private _verifyTokenJsonWebToken: VerifyTokenJsonWebTokenUseCase,
    private _getApiKey: GetFApiKeyUseCase,
  ) {}

  public async handler(authToken: string, nameApp: string, authorizer: string) {
    const apiKeys = await this._getApiKey.handler(nameApp);
    if (!apiKeys.length)
      throw new HttpException(
        'No se reconoce el nombre de la app',
        HttpStatus.FORBIDDEN,
      );
    switch (authorizer) {
      case Autorizer.JSONWEBTOKEN:
        return this._verifyTokenJsonWebToken.handler(
          authToken,
          apiKeys[0].apiKey,
        );
      case Autorizer.JWTSERVICE:
        return this._verifyTokenJsonWebToken.handler(
          authToken,
          apiKeys[0].apiKey,
        );
      default:
        break;
    }
  }
}
