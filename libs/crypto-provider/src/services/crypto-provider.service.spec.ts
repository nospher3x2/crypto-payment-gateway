import { Test, TestingModule } from '@nestjs/testing';
import { CryptoProviderService } from './crypto-provider.service';

describe('CryptoProviderService', () => {
  let service: CryptoProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoProviderService],
    }).compile();

    service = module.get<CryptoProviderService>(CryptoProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
