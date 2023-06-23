import { ConsoleLogger, LoggerService } from '@nestjs/common';
import { Logger, Injectable } from '@nestjs/common';

export class CustomLoggerService extends ConsoleLogger implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: string, fileNameEmit: string, stack?: string, httpCode?: number, projectName?: string ) {
    const now = Date.now();
    // this.logger.log(message,  `${Date.now() - now} ${fileNameEmit}`)
    super.log(message, fileNameEmit)
  }

  /**
   * Write an 'error' level log.
   */
  error(message: string, fileNameEmit: string, stack?: string, httpCode?: number, projectName?: string ) {
    const now = Date.now();
    // this.logger.log(message,  `${Date.now() - now} ${fileNameEmit}`)
    super.error(message, stack, fileNameEmit)
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: string, fileNameEmit: string, stack?: string, httpCode?: number, projectName?: string ) {
    super.warn(message, fileNameEmit)
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: string, fileNameEmit: string, stack?: string, httpCode?: number, projectName?: string ) {
    super.debug(message, fileNameEmit)
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: string, fileNameEmit: string, stack?: string, httpCode?: number, projectName?: string ) {
    super.verbose(message, fileNameEmit)
  }
}