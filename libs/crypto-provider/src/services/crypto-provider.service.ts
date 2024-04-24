import { Currency, CurrencyNetwork } from '@app/shared';
import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  BtcCryptoProvider,
  EthCryptoProvider,
  LtcCryptoProvider,
} from '../providers';
import { ProviderNotFoundException } from '../exceptions/provider-not-found.exception';

type CryptoProvider<T extends Currency> = T extends 'BTC'
  ? BtcCryptoProvider
  : T extends 'ETH'
    ? EthCryptoProvider
    : T extends 'LTC'
      ? LtcCryptoProvider
      : never;

@Injectable()
export class CryptoProviderService implements OnModuleInit {
  private providers: Readonly<{
    [K in Currency]: (network: CurrencyNetwork<K>) => CryptoProvider<K>;
  }>;

  public onModuleInit() {
    this.providers = Object.freeze({
      BTC: (network) => new BtcCryptoProvider(network),
      LTC: (network) => new LtcCryptoProvider(network),
      ETH: (network) => new EthCryptoProvider(network),
    });
  }

  public getProvider<T extends Currency>(
    currency: T,
    network: CurrencyNetwork<T>,
  ): CryptoProvider<T> {
    const provider = this.providers[currency];
    if (!provider) {
      throw new ProviderNotFoundException(currency);
    }

    return provider(network);
  }
}
