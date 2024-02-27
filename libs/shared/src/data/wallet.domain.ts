import { Currency } from '../enums/currency.enum';
import { WalletCredentialsDomain } from './wallet.credentials.domain';

export class WalletDomain {
  private readonly _address: string;
  private readonly _currency: Currency;
  private readonly _balance: number;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  constructor(wallet: Partial<WalletDomain>) {
    Object.assign(this, wallet);
  }

  get address(): string {
    return this._address;
  }

  get currency(): Currency {
    return this._currency;
  }

  get balance(): number {
    return this._balance;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}

export class WalletWithCredentialsDomain extends WalletDomain {
  private readonly _credentials: WalletCredentialsDomain;

  constructor(wallet: Partial<WalletWithCredentialsDomain>) {
    super(wallet);
  }

  get credentials(): WalletCredentialsDomain {
    return this._credentials;
  }
}
