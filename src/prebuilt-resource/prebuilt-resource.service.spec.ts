import { Test, TestingModule } from '@nestjs/testing';
import { PrebuiltResourceService } from './prebuilt-resource.service';

describe('PrebuiltResourceService', () => {
  let service: PrebuiltResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrebuiltResourceService],
    }).compile();

    service = module.get<PrebuiltResourceService>(PrebuiltResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
