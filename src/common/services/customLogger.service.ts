import { ConsoleLogger, Inject, LoggerService, Scope } from '@nestjs/common';
import { Logger, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { DateTime } from 'luxon';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService
  extends ConsoleLogger
  implements LoggerService
{
  constructor(@Inject('LOG_SERVICE') private client: ClientProxy) {
    super();
  }
  /**
   * Write a 'log' level log.
   */
  log(
    message: string,
    fileNameEmit: string,
    stack?: string,
    httpCode?: number,
    projectName?: string,
  ) {
    const now = Date.now();
    // this.logger.log(message,  `${Date.now() - now} ${fileNameEmit}`)
    super.log(message, fileNameEmit);
  }

  /**
   * Write an 'error' level log.
   */
  error(
    message: string,
    stack?: string,
    fileNameEmit?: string,
  ) {
    const dateNow = DateTime.local().setZone('America/Bogota');
    const payload = {
      message: message,
      fileNameEmit: fileNameEmit,
      stack: stack,
      date: dateNow,
      projectName: process.env.NAME_APP,
    };
    this.client
      .send(
        {
          cmd: 'register-log',
        },
        JSON.stringify(payload),
      )
      .subscribe({
        next: (data) => console.log(data),
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
    super.error(message, stack, fileNameEmit);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(
    message: string,
    fileNameEmit: string,
    stack?: string,
    httpCode?: number,
    projectName?: string,
  ) {
    super.warn(message, fileNameEmit);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(
    message: string,
    fileNameEmit: string,
    stack?: string,
    httpCode?: number,
    projectName?: string,
  ) {
    super.debug(message, fileNameEmit);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(
    message: string,
    fileNameEmit: string,
    stack?: string,
    httpCode?: number,
    projectName?: string,
  ) {
    super.verbose(message, fileNameEmit);
  }
}
