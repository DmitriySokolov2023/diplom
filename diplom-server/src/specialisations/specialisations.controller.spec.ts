import { Test, TestingModule } from '@nestjs/testing';
import { SpecialisationsController } from './specialisations.controller';

describe('SpecialisationsController', () => {
  let controller: SpecialisationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialisationsController],
    }).compile();

    controller = module.get<SpecialisationsController>(SpecialisationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
