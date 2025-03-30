import { Test, TestingModule } from '@nestjs/testing';
import { PrebuiltResourceController } from './prebuilt-resource.controller';
import { PrebuiltResourceService } from './prebuilt-resource.service';

describe('PrebuiltResourceController', () => {
  let controller: PrebuiltResourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrebuiltResourceController],
      providers: [PrebuiltResourceService],
    }).compile();

    controller = module.get<PrebuiltResourceController>(PrebuiltResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
