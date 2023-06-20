import { Module } from '@nestjs/common';
import { FileDataController } from './infraestructure/controllers/file-data/file-data.controller';

@Module({
  controllers: [FileDataController]
})
export class FileModule {}
