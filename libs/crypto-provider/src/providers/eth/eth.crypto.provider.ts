import { Injectable } from '@nestjs/common';
import { CreateRandomWalletOutput, CryptoProvider } from '../crypto.provider';
import { CurrencyNetwork } from '@app/shared';
import { ProviderNotImplementedException } from '@app/crypto-provider/exceptions/provider-not-implemented.exception';

@Injectable()
export class EthCryptoProvider extends CryptoProvider<'ETH'> {
  constructor(network: CurrencyNetwork<'ETH'>) {
    super(network);
    throw new ProviderNotImplementedException('ETH');
  }
  public createRandomWallet(): Promise<CreateRandomWalletOutput<'ETH'>> {
    return Promise.resolve({
      currency: 'ETH',
      network: 'ethereum',
      walletAddress: 'random-address',
      walletPrivateKey: 'random-private-key',
    });
  }
}
