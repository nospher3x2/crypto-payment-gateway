export const Currency = Object.freeze({
  BTC: 'BTC',
  ETH: 'ETH',
  LTC: 'LTC',
});

export type Currency = keyof typeof Currency;
