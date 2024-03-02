import { Currency, WalletCredentialDomain, WalletDomain } from '@app/shared';

export abstract class WalletRepository {
  public abstract findAll(): Promise<WalletDomain<Currency>[]>;

  public abstract findOneById(
    id: string,
  ): Promise<WalletDomain<Currency> | null>;

  public abstract saveOne(wallet: WalletDomain<Currency>): Promise<void>;

  public abstract saveOneWithCredential(
    wallet: WalletDomain<Currency>,
    credential: WalletCredentialDomain,
  ): Promise<void>;

  public abstract deleteOne(id: string): Promise<boolean>;
}
