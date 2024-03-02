import { Currency } from './currency.enum';

export type CurrencyNetworkMap = {
  BTC: 'bitcoin' | 'regtest' | 'testnet';
  ETH: 'ethereum';
  LTC: 'litecoin';
};

export type CurrencyNetwork<T extends Currency> = CurrencyNetworkMap[T];
