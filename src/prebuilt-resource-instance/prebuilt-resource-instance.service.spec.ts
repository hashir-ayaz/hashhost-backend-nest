import { Test, TestingModule } from '@nestjs/testing';
import { PrebuiltResourceInstanceService } from './prebuilt-resource-instance.service';

describe('PrebuiltResourceInstanceService', () => {
  let service: PrebuiltResourceInstanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrebuiltResourceInstanceService],
    }).compile();

    service = module.get<PrebuiltResourceInstanceService>(PrebuiltResourceInstanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
