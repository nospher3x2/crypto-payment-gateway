import { Currency, CurrencyNetwork } from '@app/shared';

export type CreateRandomWalletOutput<T extends Currency> = {
  currency: T;
  network: CurrencyNetwork<T>;
  walletAddress: string;
  walletPrivateKey: string;
};

export abstract class CryptoProvider<T extends Currency> {
  constructor(public readonly network: CurrencyNetwork<T>) {}

  public abstract createRandomWallet(): Promise<CreateRandomWalletOutput<T>>;
}
