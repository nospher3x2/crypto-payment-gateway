import { Currency } from './currency.enum';

export type CurrencyNetworkMap = {
  BTC: 'bitcoin' | 'bitcoincash' | 'bnb';
  ETH: 'ethereum';
  LTC: 'litecoin';
};

export type CurrencyNetwork<T extends Currency> = CurrencyNetworkMap[T];
