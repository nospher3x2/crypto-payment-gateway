import { Currency } from './currency.enum';

export const CurrencyNetwork = Object.freeze({
  BTC: ['bitcoin', 'bitcoincash', 'bnb'],
  ETH: ['ethereum'],
  LTC: ['litecoin'],
});

export type CurrencyNetwork<T extends typeof Currency> = {
  [K in keyof T]: T[K] extends Currency ? T[K] : never;
}[keyof T];
