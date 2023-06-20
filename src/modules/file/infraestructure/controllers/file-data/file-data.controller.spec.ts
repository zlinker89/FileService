import { Test, TestingModule } from '@nestjs/testing';
import { FileDataController } from './file-data.controller';

describe('FileDataController', () => {
  let controller: FileDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileDataController],
    }).compile();

    controller = module.get<FileDataController>(FileDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
