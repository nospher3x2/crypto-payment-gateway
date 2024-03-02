import { Currency, CurrencyNetwork } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { CryptoProvider } from '../providers/crypto.provider';
import {
  BtcCryptoProvider,
  EthCryptoProvider,
  LtcCryptoProvider,
} from '../providers';

const providers: {
  [K in Currency]: (network: CurrencyNetwork<K>) => CryptoProvider<K>;
} = {
  BTC: (network) => new BtcCryptoProvider(network),
  LTC: (network) => new LtcCryptoProvider(network),
  ETH: (network) => new EthCryptoProvider(network),
} as const;

@Injectable()
export class CryptoProviderService {
  public getProvider<T extends Currency>(
    currency: T,
    network: CurrencyNetwork<T>,
  ): CryptoProvider<T> {
    const provider = providers[currency];
    if (!provider) {
      throw new Error(`Provider for ${currency} not found`);
    }

    return provider(network);
  }
}
