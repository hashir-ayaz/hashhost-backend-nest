import { Test, TestingModule } from '@nestjs/testing';
import { PrebuiltResourceInstanceController } from './prebuilt-resource-instance.controller';
import { PrebuiltResourceInstanceService } from './prebuilt-resource-instance.service';

describe('PrebuiltResourceInstanceController', () => {
  let controller: PrebuiltResourceInstanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrebuiltResourceInstanceController],
      providers: [PrebuiltResourceInstanceService],
    }).compile();

    controller = module.get<PrebuiltResourceInstanceController>(PrebuiltResourceInstanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
