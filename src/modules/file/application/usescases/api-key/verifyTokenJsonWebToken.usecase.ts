import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { verify } from "jsonwebtoken";

@Injectable()
export default class VerifyTokenJsonWebTokenUseCase {
  constructor(
  ) {}

  public async handler(authToken: string, secretToken: string) {
    if (authToken.split('.').length !== 3) {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
    try {
      return await verify(authToken, secretToken);
    } catch (err) {
      console.log(err);
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}