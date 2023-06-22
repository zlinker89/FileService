import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Verify } from 'crypto';
import { Observable } from 'rxjs';
import ValidateTokenUseCase from './../../../application/usescases/api-key/validateToken.usecase';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _validateToken: ValidateTokenUseCase) {
    
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (
      !request.headers.authorization ||
      !request.headers.authorizer ||
      !request.headers.nameapp
    )
      return false;
    const authToken = request.headers.authorization.replace('Bearer ', '')
    return this._validateToken.handler(authToken, request.headers.nameapp, request.headers.authorizer)
      .then((decoded: any) => {
        request.user = decoded.user;
        return true;
      })
      .catch((err) => {
        const message = 'Token error: ' + (err.message || err.name);
        throw new HttpException(message, HttpStatus.FORBIDDEN);
      });
  }
}
