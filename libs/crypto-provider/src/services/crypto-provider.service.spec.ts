import { Test, TestingModule } from '@nestjs/testing';
import { CryptoProviderService } from './crypto-provider.service';
import { BtcCryptoProvider } from '../providers';
import { ProviderNetworkNotFoundException } from '../exceptions/provider-network-not-found.exception';
import { ProviderNotImplementedException } from '../exceptions/provider-not-implemented.exception';

describe('CryptoProviderService', () => {
  let service: CryptoProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoProviderService],
    }).compile();

    service = module.get<CryptoProviderService>(CryptoProviderService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('should return BtcCryptoProvider', async () => {
    const btcProvider = service.getProvider('BTC', 'bitcoin');
    expect(btcProvider).toBeInstanceOf(BtcCryptoProvider);
  });

  it('should throw ProviderNetworkNotFoundException for BTC', async () => {
    const btcProvider = service.getProvider('BTC', 'ethereum' as any);
    await expect(btcProvider).rejects.toThrow(ProviderNetworkNotFoundException);
  });

  it('should return LtcCryptoProvider', async () => {
    const ltcProvider = service.getProvider('LTC', 'litecoin');
    expect(ltcProvider).toBeInstanceOf(BtcCryptoProvider);
  });

  it('should throw ProviderNetworkNotFoundException for LTC', async () => {
    const ltcProvider = service.getProvider('LTC', 'ethereum' as any);
    await expect(ltcProvider).rejects.toThrow(ProviderNetworkNotFoundException);
  });

  it('should return EthCryptoProvider', async () => {
    const ethProvider = service.getProvider('ETH', 'ethereum');
    expect(ethProvider).toBeInstanceOf(BtcCryptoProvider);
  });

  it('should throw ProviderNotImplementedException for ETH', async () => {
    const ethProvider = service.getProvider('ETH', 'ethereum');
    await expect(ethProvider).rejects.toThrow(ProviderNotImplementedException);
  });
});
