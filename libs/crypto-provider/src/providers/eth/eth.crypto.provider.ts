import { Injectable } from '@nestjs/common';
import { CreateRandomWalletOutput, CryptoProvider } from '../crypto.provider';

@Injectable()
export class EthCryptoProvider extends CryptoProvider<'ETH'> {
  public createRandomWallet(): Promise<CreateRandomWalletOutput<'ETH'>> {
    return Promise.resolve({
      currency: 'ETH',
      network: 'ethereum',
      walletAddress: 'random-address',
      walletPrivateKey: 'random-private-key',
    });
  }
}
